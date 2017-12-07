import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import {BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult} from '@ionic-native/barcode-scanner'
import { HttpClient } from '@angular/common/http';

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database'

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  result: BarcodeScanResult

  BASE_URL = 'https://world.openfoodfacts.org/api/v0/product/'
 
  // variables à utiliser côté template
  api_response_raw;
  api_response;
  afl: AngularFireList<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private bcs: BarcodeScanner,
              private toastCtrl: ToastController,
              private _http: HttpClient,
              private afd: AngularFireDatabase) {
  
    // Instanciation de AngularFireList via AngularFireDatabase
    // on souhaite avoir un food-article pour que lorsqu'il y a persitence que l'on ait
    /*
      foodchecker
          food-articles
                aze125qsd125 [pour l'id généré automatiquement]
                  name: "chocolat" 
                  id: "..."
                sdf254fgt859
                  name: "..."
                  id: "..."
    */

    this.afl = this.afd.list('/food-articles') // food-articles sera un noeud ou enfant de notre base de données
                
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


  getArticleByBarcode(code: string) {
    this._http
          .get(`${this.BASE_URL}${code}`)
          .subscribe(data => this.displayResult(data), 
                      error => this.handleGetError(error))
  }

  displayResult(data) {
    this.api_response_raw = data; // pour la condition d'affichage
    this.api_response = data; // pour récupérer les infos qui nous intéressent
  }

  handleGetError(error) {
    console.log(error);
    console.error(error.message);
  }
}
