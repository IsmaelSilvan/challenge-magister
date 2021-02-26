import { Component, OnInit, Type } from '@angular/core';
import { PostService } from '../../services/post.service';  // Importamos el servicio de Post para utilizar su método y obtener todas las entradsa, muy parecido a lo que hicimos para cargar las categorías en app-component.html
import { UserService } from '../../services/user.service';  // Esto lo utilizaremos para identificar al usuario y que solo nos muestre en la vista los botones de editar y borrar si es el creador de esa entrada
import { Post } from '../../models/post';                   // Importamos a su vez el modelo Post que vamos a utilizar
import { global } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService, UserService]
})
export class HomeComponent implements OnInit {
  public page_title: string;
  public api_url;
  public identity;
  public token;
  public posts: Array<Post>;                      // Declaramos la variable posts (que utilizaremos para recoger todos las las publicaciones)
                                                    // Y le decimos que es de tipo array/matriz de objetos tipo Post

  constructor(
    private _postService: PostService,
    private _userService: UserService
  ) {
    this.page_title = 'Inicio';
    this.api_url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getPosts();
  }


                                                         // Recoger todos las publicaciones de la base de datos
  getPosts() {
    this._postService.getPosts().subscribe(
      response => {
        if (response.status == 'success') {
          this.posts = response.posts;                // Asignamos a posts el array de arrays de datos de nuestras publicaciones
         // console.log(this.posts);
        } else {
          console.log(Error);
        }

      },
      error => {
        console.log(<any>error);
      }

    )
  }


                                                         // Borrar la publicación selecionada
  deletePost(postID) {
    this._postService.delete(this.token, postID).subscribe(
      response => {
        this.getPosts();
      },
      error => {
        console.log(<any>error);
      }

    )
  }







}
