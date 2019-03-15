import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, chofer: string , icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public api: Api, public platform: Platform) {

    //constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public api: Api, public platform: Platform) {
    //console.log(this.platform);
    // public storage: Storage,
    /*this.platform.ready().then( () => {
			this.geolocation.getCurrentPosition().then( resp => {});
			setTimeout(() => {
				this.loadMarks('');
				this.user = this.api.userData;
			},200);
    });*/
    //Pruebas para constructor de listar 
    



    
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Viaje ' + i,
        note: 'Chofer:',
        chofer: 'nombre ',
        icon: this.icons[5]
      });
    }
  }


  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
