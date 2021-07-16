import { Component } from '@angular/core';
import {Storage} from '@ionic/storage';
import {ModalController, NavParams, ToastController} from '@ionic/angular';
import {CreditCardPage} from '../modals/credit-card/credit-card.page';
import {AddressPage} from '../modals/address/address.page';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    myItems: any = [];
    item: any = [];

    constructor(
        private storage: Storage,
        private modalCtrl: ModalController,
        public toastCtrl: ToastController
    ) {

    }

    ionViewDidEnter(){
        this.storage.get("proCoffee.myItems").then((myItems: any) => {
            this.myItems = myItems;
        })
    }

    dismissItem(item){
        this.myItems = this.myItems.filter((jsonObject) => {
            return jsonObject.id != item.id;
        });

        this.storage.set("proCoffee.myItems", this.myItems);
    }


    sendPayment(item){

        this.storage.get('proCoffee.ccInfo').then((ccInfo: any) => {

            if(!ccInfo){
                this.openCreditCardModal();
                this.paymentStatus("Enter your credit card info!");
            }
            else{
                this.dismissItem(item);
                this.paymentStatus("Payment Successful");
            }
        });
    }

    async openCreditCardModal() {
        const modal = await this.modalCtrl.create({
            component: CreditCardPage
        });

        await modal.present();
    }

    async paymentStatus(message) {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }

}
