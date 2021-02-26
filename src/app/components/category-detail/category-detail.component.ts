import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; //  Importamos el routing para hacer peticiones
import { Category } from '../../models/category'                  // Importamos el modelo de las categorías Category
import { CategoryService } from '../../services/category.service'; // Importamos el servicio de categorías
import { UserService } from '../../services/user.service';  // Esto lo utilizaremos para identificar al usuario y que solo nos muestre en la vista los botones de editar y borrar si es el creador de esa entrada
import { PostService } from '../../services/post.service';  // Igual que en home.component.ts, este servicio lo utilizaremos para eliminar las publicaciones que queramos
import { global } from '../../services/global';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryService, UserService, PostService]
})
export class CategoryDetailComponent implements OnInit {
  public page_title: string;

  public category: Category;
  public posts: any;                                      // Creamos la variable de Category que is igual al objeto/modelo Category, también se podría poner así
  public api_url: string;
  public identity;
  public token;
  constructor(
    private _categoryService: CategoryService,
    private _userService: UserService,    
    private _postService: PostService,                          // Este servicionos servirá para utilizarlo en la vista y borrar las publicaciones
    private _router: Router,                                      // Incluimos los servicios del router en el constructor
    private _route: ActivatedRoute
  ) {


    this.api_url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  ngOnInit(): void {
    this.getPostsByCategory();                            // Incluimos el método en el OnInit para que lo realice al cargar el componente
  }


  getPostsByCategory() {
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._categoryService.getCategory(id).subscribe(    // Pasando la id de la categoría, objetenemos los datos del ID que selecionamos
        response => {
          if (response.status == 'success') {
            console.log(response);
            this.category = response.category;                // Asignamos los datos recibidos a nuestra variable category
            this.page_title = this.category.name;


            // Recogemos las publicaciones asociadas al post

            this._categoryService.getCategoryPosts(id).subscribe(
              response => {
                if (response.status == 'success') {
                  console.log(response);
                  this.posts = response.posts;              // Asignamos los datos recibidos a nuestra variable post
                } else {
                  this._router.navigate(['/inicio']);
                }
              },
                  error => {
                console.log(error);
              }


            )

          } else {
            this._router.navigate(['/inicio']);
          }

        },
        error => {
          console.log(error);
        }

      )
    })
  }


}
