import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(
      private navCtrl: NavController,
      private storage: Storage
  )
  { }

  ngOnInit() {
  }

  goToTabs(){
    this.navCtrl.navigateRoot('/tabs');

    this.storage.set("proCoffee.slidesOpened", true);
  }

}
