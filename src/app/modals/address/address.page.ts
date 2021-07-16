import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import axios from 'axios';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  addressInfo: any = {};
  private readonly API_KEY: string = "AIzaSyB4F98RwhkT11BtfCCOxZuxJA_sHpZivrU";
  currentLoading: any = null;

  constructor(
    private modalCtrl: ModalController,
    private storage: Storage,
    private toastController: ToastController,
    private geolocation: Geolocation,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.storage.get('proCoffee.address').then((address: any) => {
      if (address)
        this.addressInfo = address;
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  storeAddress() {

    if (!this.addressInfo.address) {
      this.showErrorMsg("Enter your address");
      return;
    }

    if (!this.addressInfo.city) {
      this.showErrorMsg("Enter your city");
      return;
    }

    if (!this.addressInfo.zip) {
      this.showErrorMsg("Enter your zip code");
      return;
    }

    this.storage.set('proCoffee.address', this.addressInfo);

    this.modalCtrl.dismiss(this.addressInfo);
  }

  getLocation() {
    this.presentLoading();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.reverseGeoCoding(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      this.dismissLoading();
      console.log('Error getting location', error);
      this.showErrorMsg("Error getting location.");
    });
  }

  reverseGeoCoding(lat, lon) {
    let tempObj = {
      street: '',
      number: '',
      city: '',
      zip: ''
    }
    axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${this.API_KEY}`)
      .then(res => {
        console.log(res);
        res.data.results[0].address_components.forEach(el => {
          el.types.forEach(type => {
            if (type == 'route') {
              tempObj.street = el.long_name;
            }
            else if (type == 'locality') {
              tempObj.city = el.long_name;
            }
            else if (type == 'postal_code') {
              tempObj.zip = el.long_name;
            }
            else if (type == 'street_address') {
              tempObj.number = el.long_name;
            }
          });
        });
        this.addressInfo.city = tempObj.city;
        this.addressInfo.zip = tempObj.zip;
        this.addressInfo.address = `${tempObj.street} ${tempObj.number}`;
        this.dismissLoading();
      })
      .catch(err => {
        this.dismissLoading();
        this.showErrorMsg("Error getting location.");
      });
  }

  async showErrorMsg(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading(message: string = null, duration: number = null) {
    if (this.currentLoading != null) {
      this.currentLoading.dismiss();
    }
    this.currentLoading = await this.loadingController.create({
      message: 'Please wait...',
      translucent: true
    });
    return await this.currentLoading.present();
  }

  async dismissLoading() {
    if (this.currentLoading != null) {
      await this.loadingController.dismiss();
      this.currentLoading = null;
    }
  }

}
