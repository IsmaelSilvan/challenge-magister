import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';   // Agregamos nuestro modelo para rellenar el formulario
import { ConexionService } from 'src/app/services/conexion/conexion.service';

 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
 

 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ConexionService]
})
export class HomeComponent   {

public items: any;                                            // Creamos la variable items, de tipo any, que recibira toda la colección
public item: Item;                                           // Creamos la variable item donde definiremos cada campo en la vista

















private matriculaCollection: AngularFirestoreCollection<any>; // Declaramos la colecion de matriculas donde guardaremos las matriculas
public matricula: any;                                        // Declaramos la variable
 













  constructor(private _conexionService: ConexionService,private _angularFirestore: AngularFirestore) {  // Importamos el servicio en el constructor
   
   
    this.item = new Item ('');                              // Damos un valor vacio a nuestro objeto
    this._conexionService.getItems().subscribe(item => {     // Con el método de nuestro servicio y el subscribe, hacemos que cada objeto dentro de items se converta en un elemento item
      this.items = item; 
    })

















  this.matricula = {  rama: '',
		  provincia: '',
		  alumno_pre: '',
		  modalidad: '',
		  horario: '',
		  tarifas: '',
						/* Datos usuario */
		  name: '',
		  dni: '',
		  email: '',
		  comunidad_examen: '',
		  direccion_user: '',
		  localidad_user: '',
		  provincia_user: '',
		  cp:''  ,
		  info_legal: '',
		  protec_datos: '',
		  pago: ''};
    this.matriculaCollection = _angularFirestore.collection<any>('matriculas');   // Cogemos la colección para las matrículas
 




  }


  


  onSubmit(){
   
      console.log(this.matricula); console.log(typeof(this.matricula));console.log(Object.values(this.matricula));
      this.matriculaCollection.add(this.matricula);
   
  
  }


}
