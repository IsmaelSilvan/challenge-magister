import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {
	public url: string;
	public identity;
	public token;

	constructor(
		public _http: HttpClient
	) {
		this.url = global.url;
	}

	test() { return 'Hola desde el servicio UserService' }



															// Método del servicio para REGISTRAR usuarios //
	register(user): Observable<any> {

		let json = JSON.stringify(user);
		let params = 'json=' + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url + 'usuario/registro', params, { headers: headers });
	}



															// Método del servicio para LOGEAR usuarios //
	signup(user, getToken = null): Observable<any> {						// Creo un método signup con el parametro user(con los datos del usuario) y "getToken"n de forma predeterminada en null, y que devuelve un Observable

		if (getToken != null) {
			user.getToken = 'true';
		}

		let json = JSON.stringify(user);								// Convierto el objeto que recibimos (user) en un JSON de texto
		let params = 'json=' + json;									// Defino los parametros que envio a la API

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); // Unimos las cabeceras

		return this._http.post(this.url + 'usuario/login', params, { headers: headers });

	}



															// Método del servicio para MOSTRAR DATOS del usuario logeado //
	getIdentity() {
		let identity = JSON.parse(localStorage.getItem('identity'));  // Marcamos una variable identity igual al objeto identity del localStorage, que a su vez con JSON.parse() lo convertimos de nuevo en un objeto JSON para trabajar con èl.

		if (identity && identity != 'undefined') {
			this.identity = identity;
		} else {
			this.identity = null;
		}

		return this.identity;
	}


	getToken() {
		let token = localStorage.getItem('token');

		if (token && token != 'undefined') {
			this.token = token;
		} else {
			this.token = null;
		}

		return this.token;
	}






															// Método del servicio para ACTUALIZAR DATOS del usuario //
	update(token, user):Observable<any>{				// Estamos utilizando el método update con los datos que el UserControler de Laravel necesita en su método updateUser, pasando como parámetros el token que autoriza al usuario y el usuario
		let json = JSON.stringify(user);
		let params = 'json=' + json;				// Ponemos los parametros recibidos del JSON convertidos previamente en un string para trabajar con esos datos

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')	// Ponemos los damos del usuario recibidos
										.set('Authorization', token);								// Le incluimos también la autorización

 
		return this._http.put(this.url + 'usuario/update', params, { headers: headers });			// Devolvemos con el método put a la URL de nuestro método en la api, los parametros más los headers definidos antes, esto es igual al método singup y register que utilizamos para registrarnos y logearnos con ayuda de la API
	}
	
}









