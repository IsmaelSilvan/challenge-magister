import { Component, OnInit } from '@angular/core';


import { ConexionService } from 'src/app/services/conexion/conexion.service';
import { Item } from 'src/app/models/item';   // Agregamos nuestro modelo para rellenar el formulario




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [ConexionService]
})
export class FormComponent implements OnInit {

  public items: any;                                            // Creamos la variable items, de tipo any, que recibira toda la colección
  public item: Item;                                           // Creamos la variable item donde definiremos cada campo en la vista



  public matricula: any;                                        // Declaramos la variable


  constructor(private _conexionService: ConexionService) {  // Importamos el servicio en el constructor


    this.item = new Item('');                              // Damos un valor vacio a nuestro objeto
    this._conexionService.getItems().subscribe(item => {     // Con el método de nuestro servicio y el subscribe, hacemos que cada objeto dentro de items se converta en un elemento item
      this.items = item;
    })


    this.matricula = { // Asigno una forma vacia para que se rellene el formulario depués
      rama: '',
      provincia: '',
      alumno_pre: '',
      modalidad: '',
      horario: '',
      tarifas: '',
      /* Datos usuario */
      name: '',
      dni: '',
      movil: '',
      email: '',
      comunidad_examen: '',
      direccion_user: '',
      localidad_user: '',
      provincia_user: '',
      cp: '',
      info_legal: '',
      protec_datos: '',
      pago: ''
    };


  }

  ngOnInit(): void {
  }


  onSubmit() {
    /*  console.log(this.matricula);
       console.log(typeof (this.matricula));
       console.log(Object.values(this.matricula));
       */
    this._conexionService.addMatricula(this.matricula); // Envio los datos que recibo  al método de mi servicio para enviar los datos finales del formulario


  }


}
