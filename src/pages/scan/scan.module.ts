import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanPage } from './scan';

@NgModule({
  declarations: [
    ScanPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanPage),
  ],
  providers: [
    BarcodeScanner
  ]
})
export class ScanPageModule {}
