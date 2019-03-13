import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../app/app.settings';

@Injectable()
export class LoginProvider {
	headers: any = new Headers({
		'Content-Type': 'application/json'
	});
	options: any = new RequestOptions({
		headers: this.headers
	});
	preloader: any;

	constructor(public http: Http, public loading: LoadingController) {}

	showLoading(){
		this.preloader = this.loading.create({
			content: 'Por favor espere...'
		});
		
		this.preloader.present();
	}

	signIn(data, showLoading = false){
		if(showLoading)
			this.showLoading();

		return new Promise<any>(resolve => {
			this.http.post(AppSettings.APP_API+'/login.php', data,this.options)
			.map(res => res.json())
			.subscribe((data:Response) => {
				resolve(data);
				if(showLoading)
					this.preloader.dismiss();
			});
		});
	}

	verifyToken(token, showLoading = false){
		console.log("Aqui");
		if(showLoading)
			this.showLoading();

		return new Promise<any>(resolve => {
			this.http.get(AppSettings.APP_API+'/login.php'+'?token='+encodeURIComponent(token))
			.map(res => res.json())
			.subscribe((data:Response) => {
				console.log(data);
				resolve(data);
				if(showLoading)
					this.preloader.dismiss();
			});
		});
	}

	signOut(token, showLoading = false){
		if(showLoading)
			this.showLoading();

		return new Promise<any>(resolve => {
			this.http.delete(AppSettings.APP_API+'/login.php'+'?token='+encodeURIComponent(token))
			.map(res => res.json())
			.subscribe((data:Response) => {
				resolve(data);
				if(showLoading)
					this.preloader.dismiss();
			});
		});
	}
}
