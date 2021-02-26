import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; //  Importamos el routing para hacer peticiones
import { UserService } from '../../services/user.service'; 			  // Importamos este servicio para coger los datos del usuario registrado
import { Category } from '../../models/category'                  // Importamos el modelo de las categorías Category
import { CategoryService } from '../../services/category.service'; // Importamos el servicio de categorías


@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {
  public page_title: string;
  public identity;                                                // Creamos las variables de identity y token para coger los datos del usuario registrado
  public token;
  public category: Category;                                      // Creamos la variable de Category que is igual al objeto/modelo Category

  public status;


  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _router: Router,                                      // Incluimos los servicios del router en el constructor
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Crear nueva categoría';

    this.identity = this._userService.getIdentity();              // Igual que en el app.component, cogemos los datos del usuario 
    this.token = this._userService.getToken();

    this.category = new Category(1, '');                           // Damos una forma vacia a nuestra categoría

  }

  ngOnInit(): void {
    console.log('Componente de CATEGORY-NEW funcionando');
    console.log(this._userService.test());							          // Prueba de que el servicio funciona
  }

  onSubmit(form) {
    this._categoryService.create(this.token, this.category).subscribe(
      response => {
        if (response.status == 'success') {
          this.category = response.category;
          this.status = 'success';

          this._router.navigate(['/inicio']);
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    )

  }

}
