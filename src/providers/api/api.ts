import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../app/app.settings';
import { Storage } from '@ionic/storage';

@Injectable()
export class Api {
	headers: any = new Headers({
		'Content-Type': 'application/json'
	});
	options: any = new RequestOptions({
		headers: this.headers
	});
	preloader: any;

	userData: any  = {
		nombre_distribuidor : '',
		apellido_distribuidor : '',
		correo_distribuidor : '',
		last_login : ''
	};;

	constructor(public http: Http, public loading: LoadingController, public storage: Storage) {
		this.storage.get('userData').then( data => {
			this.userData = data.body;
		}, err => console.log(err));
	}

	showLoading(){
		this.preloader = this.loading.create({
			content: 'Por favor espere...'
		});

		this.preloader.present();
	}

	get(url, action, ShowLoading = false){
		if(ShowLoading)
			this.showLoading();

		return new Promise<any>(resolve => {
			this.http.get(AppSettings.APP_API+url+'?token='+encodeURIComponent(this.userData.token)+'&action='+action)
			.map(res => res.json())
			.subscribe((data:Response) => {
				console.log(data);
				resolve(data);
				if(ShowLoading)
					this.preloader.dismiss();
			});
		})

	}

	post(url, body, ShowLoading = false){
		if(ShowLoading)
			this.showLoading();

		body.token = this.userData.token;

		return new Promise<any>(resolve => {
			this.http.post(AppSettings.APP_API+url, body, this.options)
			.map(res => res.json())
			.subscribe((data:Response) => {
				console.log(data);
				resolve(data);
				if(ShowLoading)
					this.preloader.dismiss();
			});
		});
	}
}
