import { Component } from '@angular/core';
import { Nav,ToastController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginProvider]
})
export class Login {
	data: any = {
		username: '',
		password: ''
	};

	constructor(public nav: Nav, public toastCtrl: ToastController, public storage: Storage, public session: LoginProvider) {}

	signIn(){
		this.session.signIn(this.data, true).then(data => {
			if(data.statusCode === 200){
				let toast = this.toastCtrl.create({
					message: 'Bienvenido',
					duration: 3000
				});
				toast.present();
				this.storage.set('userData', data);
				this.nav.setRoot(HomePage);
			}else{
				let toast = this.toastCtrl.create({
					message: data.statusMessage,
					duration: 3000
				});
				toast.present();
			}
		},err => console.log(err))
	}
}