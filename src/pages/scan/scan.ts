import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import {BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult} from '@ionic-native/barcode-scanner'
// import { ToastController } from 'ionic-angular/components/toast/toast-controller';


@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  result: BarcodeScanResult

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private bcs: BarcodeScanner,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }

  // Implémentation du scan ... en mode Promise (.then ... catch)
  scanBarcode() {
    const options: BarcodeScannerOptions = {
      prompt: 'Pointer votre camera vers un code barre', // message à afficher
      torchOn: false, // la lampe du phone ne s'allume pas
    }

    // ... en mode Promise (.then ... catch)
    this.bcs.scan(options)
        .then(res => {
          this.result = res;
        })
      .catch(err => {
        this.toastCtrl.create({
          message: err.message
        }).present()
      })
     
  }

 // Implémentation du scan ... en mode ES7 (...async ... await)
//  async scanBarcode() {
//    try {
//      // creation des options
//      const options: BarcodeScannerOptions = {
//        prompt: 'Pointer votre camera vers un code barre', // message à afficher
//        torchOn: false, // la lampe du phone ne s'allume pas
//      }

//      // await permet d'attendre la resolution de la Promise (partout où il yaurait eu un then)
//      this.result = await this.bcs.scan(options)
//      await this.bcs.scan(options)
   
//     } catch(err) {
//       console.error(err);
//       this.toastCtrl.create({message: err.message}).present()
//     }
//   }


}
