import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {NavController, Platform} from '@ionic/angular';
import {Storage} from '@ionic/storage';

const routes: Routes = [
    {
        path: 'tabs',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'intro',
        loadChildren: './intro/intro.module#IntroPageModule'
    }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

    constructor(
        private navCtrl: NavController,
        private storage: Storage,
        private platform: Platform
    ) {

        this.platform.ready().then(() => {
            this.storage.get("proCoffee.slidesOpened").then((data: any) => {
                if(data){
                    this.navCtrl.navigateRoot('/tabs');
                }
                else{
                    this.navCtrl.navigateRoot('/intro');
                }
            });
        });
    }

}
