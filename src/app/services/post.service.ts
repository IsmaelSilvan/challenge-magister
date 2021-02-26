import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Post } from '../models/post';
import { global } from './global';

@Injectable()
export class PostService {
    public url: string;


    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }

                                                    // Método para GUARDAR nuevas entradas //
    create(token, post): Observable<any> {                      // Creamos el método para crear entradas y le pasamos el token del usuario (para la autorización) y el post que guardamos
        let json = JSON.stringify(post);                        // Lo que recibimos dentro de categoría lo convertimos en un string
        let params = 'json=' + json;                                // Pasamos los datos anteriores dentro de params

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') // Definimos la cabecera de como enviaremos estos datos 
            .set('Authorization', token);


        return this._http.post(this.url + 'post', params, { headers: headers });    // Devolvemos estos datos a la ruta del API, (recuerda que ::resources nos creaba las rutas de forma autmática)
    }



    

                                                            // Método del servicio para MOSTRAR las publicaciones //
    getPosts(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); // Definimos la cabecera de como enviaremos estos datos 


        return this._http.get(this.url + 'post', { headers: headers });    //  En este caso solo necesitamos la ruta de la API y los headers(recuerda que si no sabes que ruta era, poniendo el comando "php artisan route:list" con el cmd en nuestra carpeta API nos enseñará todas las rutas creadas y lo que utilizan ) 
    }

                                                                // Método del servicio para MOSTRAR UNA UNICA PUBLICACION //
    getPost(postID): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');  


        return this._http.get(this.url + 'post/' + postID, { headers: headers });    //  Es la misma ruta que el método anterior, pero pasando la id del post
    }






                                                                // Método del servicio para ACTUALIZAR una publicación //
    update(token, post, postID): Observable<any> {
        let json = JSON.stringify(post);                        // Lo que recibimos dentro de categoría lo convertimos en un string
        let params = 'json=' + json;                                // Pasamos los datos anteriores dentro de params

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') // Definimos la cabecera de como enviaremos estos datos 
            .set('Authorization', token);

        return this._http.put(this.url + 'post/' + postID, params, { headers: headers });    //  En este caso solo necesitamos la ruta de la API y los headers(recuerda que si no sabes que ruta era, poniendo el comando "php artisan route:list" con el cmd en nuestra carpeta API nos enseñará todas las rutas creadas y lo que utilizan )
    }
 





                                                                // Método del servicio para BORRAR una publicación //
    delete(token, postID): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') // Definimos la cabecera de como enviaremos estos datos 
                                       .set('Authorization', token);

        return this._http.delete(this.url + 'post/' + postID, { headers: headers });    //  En este caso usamos el envio http delete y solo necesitamos la ruta de la API y los headers(recuerda que si no sabes que ruta era, poniendo el comando "php artisan route:list" con el cmd en nuestra carpeta API nos enseñará todas las rutas creadas y lo que utilizan )
    } 
      
}