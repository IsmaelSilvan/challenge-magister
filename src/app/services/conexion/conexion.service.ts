import { Injectable } from '@angular/core';
// Importamos modulos del FireStore para guardar datos
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs'; // Inyectamos el observable

// Importamos las interfaces de los distintos campos
import { ItemInterface } from 'src/app/interfaces/item-interface'; // Importamos nuestro Modelo/Interface
import { ComunidadInterface } from 'src/app/interfaces/comunidad-interface';
import { ProvinciaInterface } from 'src/app/interfaces/provincia-interface';
import { RamaInterface } from 'src/app/interfaces/rama-interface';
import { TarifaInterface } from 'src/app/interfaces/tarifa-interface';
import { HorarioInterface } from 'src/app/interfaces/horario-interface';
import { ModalidadInterface } from 'src/app/interfaces/modalidad-interface';


@Injectable({
  providedIn: 'root'
})



export class ConexionService {

  // Creamos estas variables a las que daremos valor en el constructor
  private itemsCollection: AngularFirestoreCollection<ItemInterface>;
  public items: Observable<ItemInterface[]>;


  // Variables para las ramas
  private ramasCollection: AngularFirestoreCollection<RamaInterface>;
  public ramas: Observable<RamaInterface[]>;


  // Variables para las comunidades autónomas
  private comunidadesCollection: AngularFirestoreCollection<ComunidadInterface>;
  public comunidades: Observable<ComunidadInterface[]>;

  
  // Variables para las provincias
  private provinciasCollection: AngularFirestoreCollection<ProvinciaInterface>;
  public provincias: Observable<ProvinciaInterface[]>;

  
  // Variables para las modalidades
  private modalidadesCollection: AngularFirestoreCollection<ModalidadInterface>;
  public modalidades: Observable<ModalidadInterface[]>;

  
  
  // Variables para los horarios 
  private horariosCollection: AngularFirestoreCollection<HorarioInterface>;
  public horarios: Observable<HorarioInterface[]>;
  
  
  // Variables para las tarifas 
  private tarifasCollection: AngularFirestoreCollection<TarifaInterface>;
  public tarifas: Observable<TarifaInterface[]>;




  // Variable de la matrícula  

  private matriculaCollection: AngularFirestoreCollection<any>; // Declaramos la colecion de matriculas donde guardaremos las matriculas
  public matricula: object;                                     // Declaramos la variable






  constructor(private _angularFirestore: AngularFirestore) {

    // Damos valores a las variables que hemos creado anteriormente
    // Item
    this.itemsCollection = _angularFirestore.collection<ItemInterface>('items/numero_array/multipli'); // Esta variable es igual a la colección recibida de FireStore, y es de tipo Iem
    this.items = this.itemsCollection.valueChanges();

    // Ramas
    this.ramasCollection = _angularFirestore.collection<RamaInterface>('ramas'); //Recoge la colección ramas que es de tipo de la interfaz ramas
    this.ramas = this.ramasCollection.valueChanges();

    // Comunidades
    this.comunidadesCollection = _angularFirestore.collection<ComunidadInterface>('lugares/comunidadID/Comunidad'); //Recoge la colección comunidad que es de tipo de la interfaz comunidades
    this.comunidades = this.comunidadesCollection.valueChanges();

    // Provincias
    this.provinciasCollection = _angularFirestore.collection<ProvinciaInterface>(' '); //Recoge la colección comunidad que es de tipo de la interfaz  provincias
    this.provincias = this.provinciasCollection.valueChanges();

    // Modalidades
    this.modalidadesCollection = _angularFirestore.collection<ModalidadInterface>(' '); //Recoge la colección comunidad que es de tipo de la interfaz  
    this.modalidades = this.modalidadesCollection.valueChanges();

    // Horarios 
    this.horariosCollection = _angularFirestore.collection<HorarioInterface>(' '); //Recoge la colección comunidad que es de tipo de la interfaz  
    this.horarios = this.horariosCollection.valueChanges();

    // Tarifas
    this.tarifasCollection = _angularFirestore.collection<TarifaInterface>(' '); //Recoge la colección comunidad que es de tipo de la interfaz  
    this.tarifas = this.tarifasCollection.valueChanges();

    

    // Matrícula
    this.matriculaCollection = _angularFirestore.collection<any>('matriculas');   // Cogemos la colección para las matrículas
    this.matricula = new Object;


  }

  // Métodos para mostrar los elementos en la vista

  getItems() {
    return this.items;
  }

  getRamas() {
    return this.ramas;
  }

  getComunidades() {
    return this.comunidades;
  }

  getProvincias() {
    return this.provincias;
  }


  getModalidades() {
    return this.modalidades;
  }

  getHorarios() {
    return this.horarios;
  }


  getTarifas() {
    return this.tarifas;
  }



  // Método para guardar los datos del formulario
  addMatricula(data: object) {
    this.matricula = data;
    // console.log(this.matricula);
    // console.log(typeof (this.matricula));
    // console.log(Object.values(this.matricula));
    this.matriculaCollection.add(this.matricula);
  }


/*
ponerDatos(plural:any, unidad: any) => {
   unidad = new Comunidad('');
  this._conexionService.getComunidades().subscribe(comunidad => {
    this.comunidades = comunidad;

}
*/

}
