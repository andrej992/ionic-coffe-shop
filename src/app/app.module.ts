import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IonicStorageModule } from '@ionic/storage';
import { AddressPage } from './modals/address/address.page';
import { CreditCardPage } from './modals/credit-card/credit-card.page';
import { AddressPageModule } from './modals/address/address.module';
import { CreditCardPageModule } from './modals/credit-card/credit-card.module';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    AddressPage,
    CreditCardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    AddressPageModule,
    CreditCardPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Facebook,
    AndroidFingerprintAuth,
    Geolocation],
  bootstrap: [AppComponent]
})
export class AppModule { }
