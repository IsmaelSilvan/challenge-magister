import { Component, OnInit, DoCheck } from '@angular/core'; // Añadimos nuevos módulos: OnInit para cargar métodos al abrir el componente y DoCheck para realizar métodos cuando la web sufra algún cambio en la vista
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CategoryService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Blog con Angular';
  public identity;
  public token;

  public categories;                            

  public api_url;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.loadUser();
    this.api_url = global.url;
  }


  ngOnInit() {
    console.log('Webapp cargada correctamente :D')
    this.getCategories();                           // Ponemos el método en el OnInit para que se ejecute al cargar la página

  }
  ngDoCheck() {
    this.loadUser();
  }
                                                          // Localizar el usuario 
  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }



                                                         // Localiza las categorías de la base de datos 
  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if (response.status == 'success') {
          this.categories = response.categories;
        //  console.log(this.categories);
        } else {
          console.log(Error);
        }

      },
      error => {
        console.log(<any>error);
      }

    )
  }

}
