import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-purchase-item',
    templateUrl: './purchase-item.component.html',
    styleUrls: ['./purchase-item.component.scss'],
})
export class PurchaseItemComponent implements OnInit {

    item: any = {};
    quantity: number = 1;
    type: string = '0';

    constructor(
        private popoverController: PopoverController,
        private navParams: NavParams,
        private storage: Storage
    )
    {
        this.item = this.navParams.get('item');
    }

    ngOnInit() {}

    purchaseItem(){

        if(Number(this.type) == 0){

            this.storage.get('proCoffee.address').then((address: any) => {

                if(!address){
                    this.dismissPopover(true);
                }
                else{
                    this.addItemToCart(this.item);
                }
            });

        }

    }

    addItemToCart(item){

        item.quantity = this.quantity;

        this.storage.get("proCoffee.myItems").then((data: any) => {
            if(!data || data.length == 0){

                let myItems: any = [
                    item
                ];

                this.storage.set("proCoffee.myItems", myItems);
            }
            else{
                let foundIndex: number = -1;

                for(let i=0; i<data.length; i++){
                    if(item.id == data[i].id){
                        foundIndex = i;
                        break;
                    }
                }

                if(foundIndex > -1){
                    data[foundIndex].quantity++;
                }
                else{
                    data.push(item);
                }

                this.storage.set("proCoffee.myItems", data);

            }

            this.dismissPopover();

        });

    }

    async dismissPopover(showAddressModal = false) {
        await this.popoverController.dismiss({showAddress: showAddressModal});
    }
}
