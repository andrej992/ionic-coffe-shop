import { Component, OnInit } from '@angular/core';
import {ModalController, Platform, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {debug} from 'util';
import {AndroidFingerprintAuth} from '@ionic-native/android-fingerprint-auth/ngx';

@Component({
    selector: 'app-credit-card',
    templateUrl: './credit-card.page.html',
    styleUrls: ['./credit-card.page.scss'],
})
export class CreditCardPage implements OnInit {

    cardInfo: any = {};
    tempInfo: any = {};

    showEdit: boolean = false;

    constructor(
        private modalCtrl: ModalController,
        private storage: Storage,
        private toastController: ToastController,
        private androidFingerprintAuth: AndroidFingerprintAuth,
        private platform: Platform
    ) { }

    ngOnInit() {
        this.storage.get('proCoffee.ccInfo').then((ccInfo: any) => {
            if(ccInfo){
                this.tempInfo = ccInfo;

                this.checkIfFingerprintIsAvailable();
            }
        });

    }

    checkIfFingerprintIsAvailable(){

        if(this.platform.is('cordova') && this.platform.is('android')){
            if(this.tempInfo && this.tempInfo.CardName){
                this.androidFingerprintAuth.isAvailable()
                    .then((result)=> {
                        this.showEdit = result.isAvailable;
                    })
                    .catch(error => console.error(error));
            }
        }
    }

    showCcInfo(){
        this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
            .then(result => {
                if (result.withFingerprint) {
                    this.cardInfo = this.tempInfo;
                } else if (result.withBackup) {
                    this.cardInfo = this.tempInfo;
                } else console.log('Didn\'t authenticate!');
            })
            .catch(error => {
                if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {

                } else {

                }
            });
    }

    closeModal(){
        this.modalCtrl.dismiss();
    }

    storeCCInfo(){

        if(!this.cardInfo.CardName){
            this.showErrorMsg("Enter your name!");
            return;
        }

        if(!this.cardInfo.CardNo){
            this.showErrorMsg("Enter your card number");
            return;
        }

        if(!this.cardInfo.ExpMonth){
            this.showErrorMsg("Enter the expiration month");
            return;
        }

        if(!this.cardInfo.ExpYear){
            this.showErrorMsg("Enter the expiration year");
            return;
        }

        if(!this.cardInfo.CVC){
            this.showErrorMsg("Enter your CVC code (usually the three digit code on the back of the card)");
            return;
        }

        if (!this.cardInfo.CardNo.match(/^\d{16}$/)){
            this.showErrorMsg("Invalid card number");
            return;
        }

        if (Number(this.cardInfo.ExpMonth) <= 0 || Number(this.cardInfo.ExpMonth) > 12){
            this.showErrorMsg("Invalid month");
            return;
        }

        if (!this.cardInfo.ExpYear.match(/^\d{2}$/)){
            this.showErrorMsg("Invalid year");
            return;
        }

        if (!this.cardInfo.CVC.match(/^\d{3}$/)){
            this.showErrorMsg("Invalid CVC Code");
            return;
        }

        if (this.cardInfo.ExpMonth>12 || this.cardInfo.ExpMonth<1){
            this.showErrorMsg("Wrong month");
            return;
        }

        if (this.cardInfo.ExpYear<18){
            this.showErrorMsg("Your card has expired");
            return;
        }

        this.storage.set('proCoffee.ccInfo', this.cardInfo);

        this.modalCtrl.dismiss(this.cardInfo);

    }

    async showErrorMsg(message) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }

}
