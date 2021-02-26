import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user'                   			// Importamos el modelo de usuarios User
import { UserService } from '../../services/user.service'; 			// Importamos el servicio/provaider
import { global } from '../../services/global';                 // Importamos el servicio global para usar la URL a la API  

// import { ViewChild } from '@angular/core';
// import { AngularFileUploaderComponent } from "angular-file-uploader";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]                                			  // Incluyo el servicio/provaider en el componente

})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;                                               // Creamos una nueva variable igual al modelo
  public status;
  public api_url;           // !!! No borrar, esta variable la usamos en la vista

  public identity;                                                 // Creamos las variables identity y token que daremos valores despúes en el constructor
  public token;

  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
  };

  public afuConfig = {
    multiple: false,                                    // Elegir si queremos subir varios archivos
    formatsAllowed: '.jpg,.png, .gif, .jpeg',           // Elegir que tipo de archivos podemos subir
    maxSize: '50',                                      // Elegir el peso en MB máximo del archivo o archivos subidos
    uploadAPI: {                                        // Ponemos la URL con el método del API para guardar el archivo
      url: global.url + 'usuario/upload',
      headers: {
        'Authorization': this._userService.getToken()   //  Ponemos el método para incluir en la autorización el token
      },
      params: {
        'page': '1'
      },
      responseType: 'json',                             // Elegimos como nos devuelve la response
    },
    theme: 'attachPin',                                   // Elegimos el thema que queremos poner
    hideProgressBar: false,                                // Elegimos si escondemos la barra de progreso  
    hideResetBtn: true,                                    // Elegimos si escondemos el botón de reset
    hideSelectBtn: false,                                   // Elegimos si escondemos el botón de seleccionar
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Seleccionar archivo',
      resetBtn: 'Reset',
      uploadBtn: 'Subir',
      dragNDropBox: 'Arrastrar y soltar',
      attachPinBtn: 'Cambia tu avatar de usuario …',
      afterUploadMsg_success: '¡ Subido correctamente !',
      afterUploadMsg_error: '¡ Fallo en la subida !',
      sizeLimit: 'Tamaño máx.'
    }
  };



  constructor(private _userService: UserService) {
    this.page_title = 'Ajustes de usuario';

    this.identity = this._userService.getIdentity();                // Cogemos los datos del usuario logeado
    this.token = this._userService.getToken();

    this.user = new User(                                           // Damos los valores predeterminados a la variable user, valores "vacios"
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      '',
      this.identity.description,
      this.identity.image);

      this.api_url = global.url;    // !!! No borrar, esta variable la usamos en la vista
  }
  ngOnInit(): void {
  }


  // Método para actualizar usuarios //
  onSubmit(form) {
    this._userService.update(this.token, this.user).subscribe(
      Response => {
        if (Response) {
          console.log(Response);
          this.status = Response.status;

          // Actualizar usuario en sesión
          if (Response.changes.name) {
            this.user.name = Response.changes.name;
          }
          if (Response.changes.surname) {
            this.user.surname = Response.changes.surname;
          }
          if (Response.changes.email) {
            this.user.email = Response.changes.email;
          }
          if (Response.changes.description) {
            this.user.description = Response.changes.description;
          }
          if (Response.changes.image) {
            this.user.image = Response.changes.image;
          }

          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

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


  // Método dentro del formulario para subir la imagen de los usuarios //

  //@ViewChild('avatarUpload')                // Cosas necesarias para usar el reset
  //private fileUpload1: AngularFileUploaderComponent;

  avatarUpload(archivo) {
    console.log(archivo.body.image);
    let data_image = archivo.body.image;
    // Asigno la imagen al usuario, para guardarlo en la bbdd. y al identity, para guardarlo en el localStore
    this.user.image = data_image;
    this.identity.image = data_image;

    // this.fileUpload1.resetFileUpload(); Función para usar el reset
  }

}
