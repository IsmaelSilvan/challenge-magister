import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; // Importamos componentes del router que utilizaremos para cerrar sesión
import { User } from '../../models/user'                   			  // Importamos el modelo de usuarios User
import { UserService } from '../../services/user.service'; 			  // Importamos el servicio/provaider

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;
  public token;
  public identity;

  constructor(
    private _userService: UserService,
    private _router: Router,                                        // Incluimos los servicios del router en el constructor
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identificate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', null);
  }

  ngOnInit(): void {
    console.log('Componente de LOGIN funcionando');
    console.log(this._userService.test());							          // Prueba de que el servicio funciona

    // Se ejecuta siempre y cierra sesión solo cuando le llega el parametro sure por la URL
    this.logout();
  }



  // Método para logear el usuario
  onSubmit(form) {
    this._userService.signup(this.user).subscribe(
      response => {
        if (response.status != 'error') {
          // TOKEN
          this.status = response.status;
          this.token = response;


          // OBJETO USUARIO IDENTIFICADO
          this._userService.signup(this.user, true).subscribe(
            response => {
              this.identity = response;

              console.log(this.token);
              console.log(this.identity);
              // PERSISISTIR DATOS DEL USUARIO IDENTIFICADO
              localStorage.setItem('token', this.token);                        // Poniendo localStorage con este método de Angular, podemos guardar datos en ese sitio
              localStorage.setItem('identity', JSON.stringify(this.identity));  // Poniendo primero como queremos llamar lo que queremos guardar, y segundo el objeto/dato a guardar
              // Dado que identity es un objeto JSON, un objeto de JavaScript, y no podemos trabajar con él, lo convertimos en un string
              this._router.navigate(['inicio']);        // Redirijo a la web de inicio
            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );

        } else {
          this.status = 'error';
        }

      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }





  logout() {
    this
    this._route.params.subscribe(params => {
      let logout = +params['sure'];                         // Con el "+" transformo el dato que recibo de un string a un número entero

      if (logout == 1) {
        localStorage.removeItem('identity');              // Elimino del localStorage los datos guardados del usuario
        localStorage.removeItem('token');

        this.identity = null;                     // Pongo de nuevo estas variables para identificar al usuario como nulo
        this.token = null;

        this._router.navigate(['inicio']);        // Redirijo a la web de inicio
      }

    })
  }


}

