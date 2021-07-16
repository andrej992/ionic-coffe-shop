import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {ModalController} from '@ionic/angular';
import {CreditCardPage} from '../modals/credit-card/credit-card.page';
import {AddressPage} from '../modals/address/address.page';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

    addressInfo: any = {};
    ccInfo: any = {};

    constructor(
        private storage: Storage,
        private modalCtrl: ModalController,
        private fb: Facebook
    ) {
        this.storage.get('proCoffee.address').then((address: any) => {
            this.addressInfo = address;
        });

        this.storage.get('proCoffee.ccInfo').then((ccInfo: any) => {
            this.ccInfo = ccInfo;
        });
    }

    ngOnInit() {

    }

    async openAddressModal() {
        const modal = await this.modalCtrl.create({
            component: AddressPage
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();

        if(data && data.address){
            this.addressInfo = data;
        }
    }

    async openCreditCardModal() {

        const modal = await this.modalCtrl.create({
            component: CreditCardPage
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();

        if(data && data.CardNo){
            this.ccInfo = data;
        }

    }

    logInWithFacebook(){
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then((res: FacebookLoginResponse) => {
                this.collectFacebookUserData()
            })
            .catch(e => console.log('Error logging into Facebook', e));
    }

    collectFacebookUserData(){
        this.fb.api('me?fields=id,name,email', []).then(data => {

            let input: any = {
                name: data.name,
                email: data.email,
                id: data.id,
                photo: 'http://graph.facebook.com/' + data.id + '/picture?type='
            };

            console.log(input);

        });
    }
}
