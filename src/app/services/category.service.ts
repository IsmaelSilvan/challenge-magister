import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Category } from '../models/category';
import { global } from './global';

@Injectable()
export class CategoryService {
    public url: string;


    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }

    test() { return 'Hola desde el servicio CategoryService' }




                                                        // Método del servicio para GUARDAR una categoría //
    create(token, category): Observable<any> {                      // Creamos el método para crear categorías y le pasamos el token del usuario y la categoría que guardamos
        let json = JSON.stringify(category);                        // Lo que recibimos dentro de categoría lo convertimos en un string
        let params = 'json=' + json;                                // Pasamos los datos anteriores dentro de params

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') // Definimos la cabecera de como enviaremos estos datos 
            .set('Authorization', token);



        return this._http.post(this.url + 'category', params, { headers: headers });    // Devolvemos estos datos a la ruta del API, (recuerda que ::resources nos creaba las rutas de forma autmática)
    }




                                                        // Método del servicio para MOSTRAR las categorías //
    getCategories(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') // Definimos la cabecera de como enviaremos estos datos 



        return this._http.get(this.url + 'category', { headers: headers });    //  En este caso solo necesitamos la ruta de la API y los headers(recuerda que si no sabes que ruta era, poniendo el comando "php artisan route:list" con el cmd en nuestra carpeta API nos enseñará todas las rutas creadas y lo que utilizan ) 
    }




                                                        // Método del servicio para MOSTRAR UNA categoría determinada //
    getCategory(id_category): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') // Definimos la cabecera de como enviaremos estos datos 



        return this._http.get(this.url + 'category/' + id_category, { headers: headers });    //  En este caso solo necesitamos la ruta de la API y los headers(recuerda que si no sabes que ruta era, poniendo el comando "php artisan route:list" con el cmd en nuestra carpeta API nos enseñará todas las rutas creadas y lo que utilizan ) 
    }
   



                                                        // Método del servicio para MOSTRAR LOS POST de una categoría determinada //
    getCategoryPosts(id_category): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') // Definimos la cabecera de como enviaremos estos datos 



        return this._http.get(this.url + 'post/category/' + id_category, { headers: headers });    //  En este caso solo necesitamos la ruta de la API y los headers(recuerda que si no sabes que ruta era, poniendo el comando "php artisan route:list" con el cmd en nuestra carpeta API nos enseñará todas las rutas creadas y lo que utilizan ) 
    }   
    


}


