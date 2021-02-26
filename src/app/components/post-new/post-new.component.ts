import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; // Importamos componentes del router que utilizaremos para cerrar sesión
import { UserService } from '../../services/user.service'; 			  // Importamos el servicio para localizar y guardar el Usuario
import { CategoryService } from '../../services/category.service'; 			  // Importamos el servicio para localizar y guardar el Usuario
import { PostService } from '../../services/post.service'; 			  // Importamos el servicio para las entradas
import { Post } from '../../models/post'                   			  // Importamos el modelo de Post/publicaciones
import { global } from '../../services/global';                 // Importamos el servicio global para usar la URL a la API al guardar imagenes

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {
  public page_title: string;
  public identity;                                                // Creamos las variables de identity y token para coger los datos del usuario registrado
  public token;
  public post: Post;                                       // Creamos la variable de Post que es igual al objeto/modelo de Post
  public categories;                                      // Esta variable la utilizamos en getCategories() para mostrar y relacionar nuestras categorías al crear el post

  public is_edit:boolean;                                   //Esta variable la usamos para dar otra vista a la vista del post-new y que muestre otros mensajes
  public api_url;
  public status;

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
      url: global.url + 'post/upload',
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
      attachPinBtn: 'Añade una imagen a tu publicación',
      afterUploadMsg_success: '¡ Subido correctamente !',
      afterUploadMsg_error: '¡ Fallo en la subida !',
      sizeLimit: 'Tamaño máx.'
    }
  };

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService,
    private _router: Router,                                      // Incluimos los servicios del router en el constructor
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Crear una entrada';

    this.identity = this._userService.getIdentity();              // Igual que en el app.component, cogemos los datos del usuario 
    this.token = this._userService.getToken();

    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);                           // Asignamos una forma a nuestra variable/objeto post

  }

  ngOnInit(): void {
    this.getCategories();

  }

                                                         // Localiza las categorías de la base de datos 
  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if (response.status == 'success') {
          this.categories = response.categories;
          //console.log(this.categories);
        } else {
          console.log(Error);
        }

      },
      error => {
        console.log(<any>error);
      }
    )

  }
                                                         // Guarda la imagen del Post 
  imageUpload(archivo) {
    console.log(archivo.body.image);
    let data_image = archivo.body.image;
    this.post.image = data_image;           // Asigno la imagen al post, para guardarlo en la bbdd. 
  }


  onSubmit(form) {
    console.log(this.post);
    this._postService.create(this.token, this.post).subscribe(
      Response => {
        if (Response) {
          this.post = Response.post;
          this.status = Response.status;
          // this._router.navigate[('')]; // setTimeout('saludo()',3000);
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


}
