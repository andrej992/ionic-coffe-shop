import { Component } from '@angular/core';
import {ModalController, PopoverController} from '@ionic/angular';
import {PurchaseItemComponent} from '../popovers/purchase-item/purchase-item.component';
import {Storage} from '@ionic/storage';
import {AddressPage} from '../modals/address/address.page';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    items: any = [];

    constructor(
        public popoverController: PopoverController,
        private storage: Storage,
        private modalCtrl: ModalController
    ) {

        let item: any = {
            id: 1,
            title: "Medium Coffee",
            price: 1.99,
            extraInfo: "Low caffeine",
            picture: "assets/images/coffee1.jpeg"
        };

        this.items.push(item);

        let item1: any = {
            id: 2,
            title: "Large Coffee",
            price: 3.99,
            picture: "assets/images/coffee2.jpg"
        };

        this.items.push(item1);

        let item2: any = {
            id: 3,
            title: "Something",
            price: 13.99,
            picture: "assets/images/coffee2.jpg",
            extraInfo: "Some new info of the item",
        };

        this.items.push(item2);

    }

    async showOptions(item) {
        const popover = await this.popoverController.create({
            component: PurchaseItemComponent,
            componentProps: { item: item }
        });

        await popover.present();

        const { data } = await popover.onWillDismiss();

        if(data && data.showAddress){
            this.openAddressModal();
        }
    };

    async openAddressModal() {
        const modal = await this.modalCtrl.create({
            component: AddressPage
        });

        await modal.present();
    }

}
