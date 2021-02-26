import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; // Importamos componentes del router para obtener la ID de la publicación
import { PostService } from '../../services/post.service';  // Importamos el servicio de Post para utilizar su método y obtener todas las entradsa, muy parecido a lo que hicimos para cargar las categorías en app-component.html
import { Post } from '../../models/post';                   // Importamos a su vez el modelo Post que vamos a utilizar
import { global } from '../../services/global';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {
  public page_title: string;
  public post: any;
  public api_url;

  constructor(
    private _postService: PostService,
    private _router: Router,                                        // Incluimos los servicios del router en el constructor
    private _route: ActivatedRoute
  ) {
    this.api_url = global.url;
  }

  ngOnInit(): void {
    this.getPost();
  }

                                                            // Mostrar la publicación que recibimos de la URL //
  getPost() {
    // Recoger la ide del post por la url
    this._route.params.subscribe(params => {
      let id = +params['id'];   // Al poner el simbolo "+" delante de params, nos combierte el string en un número entero
      console.log(id)

      // Hacer la petición ajax para sacar los datos 
      this._postService.getPost(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.post = response.post;   console.log(response);
            // console.log(this.post.call_category.name);
          } else { this._router.navigate(['/inicio']) }
        },
        error => {
          this._router.navigate(['/inicio'])
          console.log(<any>error);
        }
      )

    })
  }
}
