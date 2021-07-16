import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import {PurchaseItemComponent} from '../popovers/purchase-item/purchase-item.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{ path: '', component: Tab1Page }])
    ],
    declarations: [
        Tab1Page,
        PurchaseItemComponent
    ],
    entryComponents: [
        PurchaseItemComponent
    ]
})
export class Tab1PageModule {}
