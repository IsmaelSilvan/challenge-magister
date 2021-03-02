import { Component, OnInit } from '@angular/core';

// Importamos nuestro servicio con Firebase
import { ConexionService } from 'src/app/services/conexion/conexion.service';

// Importamos los modelos de los elementos a plasmar en la vista
import { Rama } from 'src/app/models/rama';
import { Comunidad } from 'src/app/models/comunidad';
import { Tarifa } from 'src/app/models/tarifa';
import { Horario } from 'src/app/models/horario';
import { Modalidad } from 'src/app/models/modalidad';
import { Provincia } from 'src/app/models/provincia';

// Tenemos que declarar esta variable para usar los métodos y la biblioteca de jQuery
declare var $: any


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [ConexionService]
})

export class FormComponent implements OnInit {
 
  // Declaración para las ramas
  public ramas: any;                                          // Creamos la variable items, de tipo any, que recibira toda la colección
  public rama: Rama;                        // Creamos la variable item donde definiremos cada campo en la vista

  // Declaración para las comunidades autónomas
  public comunidades: any;
  public comunidad: Comunidad;

  // Declaración para las provincias
  public provincias: any;
  public provincia: Provincia;

  // Declaración para las modalidades
  public modalidades: any;
  public modalidad: Modalidad;


  // Declaración para las horarios
  public horarios: any;
  public horario: Horario;


  // Declaración para las tarifas
  public tarifas: any;
  public tarifa: Tarifa;



  // Declaramos la variable matricula para luego darle forma y enviarla al Firebase
  public matricula: any;


  constructor(private _conexionService: ConexionService) {  // Importamos el servicio en el constructor
    // Parte del constructor para plasmar datos en la vista
 
    // Descomponer individualmente Ramas
    this.rama = new Rama('');                           // Damos un valor vacio a nuestro objeto
    this._conexionService.getRamas().subscribe(rama => { // Con el método de nuestro servicio y el subscribe, hacemos que cada objeto dentro de items se converta en un elemento item
      this.ramas = rama;
    })

    // Descomponer individualmente las comunidades
    this.comunidad = new Comunidad('');
    this._conexionService.getComunidades().subscribe(comunidad => {
      this.comunidades = comunidad;
    })

    // Descomponer individualmente las provincias
    this.provincia = new Provincia('');
    this._conexionService.getProvincias().subscribe(provincia => {
      this.provincias = provincia;
    })

    // Descomponer individualmente las modalidades
    this.modalidad = new Modalidad('');
    this._conexionService.getModalidades().subscribe(modalidad => {
      this.modalidades = modalidad;
    })

    // Descomponer individualmente las horarios
    this.horario = new Horario('');
    this._conexionService.getHorarios().subscribe(horario => {
      this.horarios = horario;
    })

    // Descomponer individualmente las tarifas
    this.tarifa = new Tarifa('');
    _conexionService.getTarifas().subscribe(tarifa => {
      this.tarifas = tarifa;
    })

    this._conexionService.getHorarios().subscribe(tarifa => {
      this.tarifas = tarifa;
    })




    // Damos valores vacios al elemento matrícula donde irán los datos del formulario
    this.matricula = {
      /* Datos que se recogeran de Firebase */
      rama: '',
      provincia: '',
      alumno_pre: '',
      entrega_material: '',
      modalidad: '',
      horario: '',
      tarifa: '',
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
      pago: '',
      recomendado: ''
    };


  }

  ngOnInit(): void {
    // this._conexionService.getTarifas();
  }

  onSubmit() {
    /*  console.log(this.matricula);
       console.log(typeof (this.matricula));
       console.log(Object.values(this.matricula));
       */
    this._conexionService.addMatricula(this.matricula); // Envio los datos que recibo  al método de mi servicio para enviar los datos finales del formulario
  }

 siguiente(siguiente:string,anterior:string){
 $('#'+siguiente).css('display','block');  
 $('#'+anterior).css('display','none');
 }
}

