import { Component, OnInit, ɵConsole } from '@angular/core';
import { User } from '../../models/user'                   			// Importamos el modelo de usuarios User
import { UserService } from '../../services/user.service'; 			// Importamos el servicio/provaider

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]                                			  // Incluyo el servicio/provaider en el componente
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public user: User;                              				    	   // Creamos una nueva variable igual al modelo
  public status: string;                                           // Creamos una variable estatus

  constructor(private _userService: UserService) {					       // Incluimos el servicio en el constructor
    this.page_title = 'Registrate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');  // Damos los valores a la variable user
  }

  ngOnInit(): void {
    console.log('Componente de registro funcionando');
    console.log(this._userService.test());							          // Prueba de que el servicio funciona
  }

  onSubmit(form) {

    this._userService.register(this.user).subscribe(            // Con este método realizamos el método register del servicio _userService con el objeto que quiero enviarle a la API (user que estra definido en el constructor)
                                                                // y utilizamos el método subscribe del Observable  que tiene dos funciones, declarando primero la que recibe la respuesta y segunda la que recibe el error
      response => {
        if (response.status == 'success') {
          this.status = response.status;
          form.reset();       											                    // Esto nos reseta el formulario entero para que al enviar no sigan los datos puestos

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