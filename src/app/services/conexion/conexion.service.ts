import { Injectable } from '@angular/core';
// Importamos modulos del FireStore y otros modulos para guardar y recoger los datos 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs'; // Inyectamos el observable
import { map } from 'rxjs/operators'; // Importamos maps para coger también las ID de las colecciones

// Importamos las interfaces de los distintos campos
import { ComunidadInterface } from 'src/app/interfaces/comunidad-interface';
import { ProvinciaInterface } from 'src/app/interfaces/provincia-interface';
import { RamaInterface } from 'src/app/interfaces/rama-interface';
// A diferencia de los anteriores en estos campos necesitamos relacionar también la id, de forma que creamos una interfaz más
import { TarifaInterface, TarifaId } from 'src/app/interfaces/tarifa-interface';
import { HorarioInterface, HorarioId } from 'src/app/interfaces/horario-interface';
import { ModalidadInterface, ModalidadId } from 'src/app/interfaces/modalidad-interface';


@Injectable({
  providedIn: 'root'
})



export class ConexionService {

  // Creamos estas variables a las que daremos valor en el constructor
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
  public modalidades: Observable<ModalidadId[]>;


  // Variables para los horarios 
  private horariosCollection: AngularFirestoreCollection<HorarioInterface>;
  public horarios: Observable<HorarioId[]>;


  // Variables para las tarifas 
  private tarifasCollection: AngularFirestoreCollection<TarifaInterface>;
  public tarifas: Observable<TarifaId[]>;



  // Variable de la matrícula  
  private matriculaCollection: AngularFirestoreCollection<any>; // Declaramos la colecion de matriculas donde guardaremos las matriculas
  public matricula: object;                                     // Declaramos la variable






  constructor(private _angularFirestore: AngularFirestore) {

    // Damos valores a las variables que hemos creado anteriormente
    // Ramas
    this.ramasCollection = _angularFirestore.collection<RamaInterface>('ramas');  // Primero recogemos en una variable toda nuestra coleccion de datos
    this.ramas = this.ramasCollection.valueChanges();                             // Asignamos los valores de los objetos recogidos en la coleccion en otra variable

    // Comunidades
    this.comunidadesCollection = _angularFirestore.collection<ComunidadInterface>('lugares/comunidadID/Comunidad');  
    this.comunidades = this.comunidadesCollection.valueChanges();

    // Provincias
    this.provinciasCollection = _angularFirestore.collection<ProvinciaInterface>('lugares/provinciaID/provincia');
    this.provincias = this.provinciasCollection.valueChanges();

    // Modalidades
    this.modalidadesCollection = _angularFirestore.collection<ModalidadInterface>('asignatura/modalidadID/modalidad');
    this.modalidades = this.modalidadesCollection.snapshotChanges().pipe( // Este método sirve para asociar a las colecciones la ID con la que fueron creadas
      map(actions => actions.map(a => {                                   // usados principalmente para asignar el atributo "for" label a las "id" de sus input de tipo radio
        const data = a.payload.doc.data() as ModalidadInterface;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    // Horarios 
    this.horariosCollection = _angularFirestore.collection<HorarioInterface>('asignatura/horarioID/horario'); //Recoge la colección comunidad que es de tipo de la interfaz  
    this.horarios = this.horariosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as HorarioInterface;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    // Tarifas
    this.tarifasCollection = _angularFirestore.collection<TarifaInterface>('asignatura/tarifasID/tarifas'); //Recoge la colección comunidad que es de tipo de la interfaz  provincias
    this.tarifas = this.tarifasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as TarifaInterface;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );




    // Matrícula
    this.matriculaCollection = _angularFirestore.collection<any>('matriculas');   // Cogemos la colección para las matrículas
    this.matricula = new Object;


  }

  // Métodos para mostrar los elementos en la vista

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
