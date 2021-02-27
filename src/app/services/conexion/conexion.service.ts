import { Injectable } from '@angular/core';
// Importamos modulos del FireStore para guardar datos
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs'; // Inyectamos el observable
import { ItemInterface } from 'src/app/interfaces/itemInterface'; // Importamos nuestro Modelo/Interface



 

 

@Injectable({
  providedIn: 'root'
})



export class ConexionService {


  // Creamos estas variables a las que daremos valor en el constructor
  private itemsCollection: AngularFirestoreCollection<ItemInterface>; /* Cambiarlo luego a Any para usarlo en más sitios, ya que en  */
  public items: Observable<ItemInterface[]>;


  private matriculaCollection: AngularFirestoreCollection<any>; // Declaramos la colecion de matriculas donde guardaremos las matriculas
  public matricula: object;                                     // Declaramos la variable
   
  

 


  constructor(private _angularFirestore: AngularFirestore) {
    this.itemsCollection = _angularFirestore.collection<ItemInterface>('items/numero_array/multipli'); // Esta variable es igual a la colección recibida de FireStore, y es de tipo Iem
    this.items = this.itemsCollection.valueChanges();







    this.matriculaCollection = _angularFirestore.collection<any>('matriculas');   // Cogemos la colección para las matrículas
    this.matricula = new Object;


  }

  getItems() {
    return this.items;
  }



addMatricula(data: object){
 this.matricula = data;
  console.log(this.matricula); 
  console.log(typeof(this.matricula));
  console.log(Object.values(this.matricula));
  this.matriculaCollection.add(this.matricula);
}
  




}
