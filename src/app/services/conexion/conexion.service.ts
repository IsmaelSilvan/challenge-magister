import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface Item { id: string; name: string; }


@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  private itemsCollection: AngularFirestoreCollection<Item>;

  items: Observable<Item[]>;


  constructor(private readonly _angularFirestore: AngularFirestore) {
    this.itemsCollection = _angularFirestore.collection<Item>('items/numero_array/multipli');
    this.items = this.itemsCollection.valueChanges({ idField: 'customID' });
  }



getItems(){
  return this.items;
}




  addItem(name: string) {
    // Persist a document id
    const id = this._angularFirestore.createId();
    const item: Item = { id, name };
    this.itemsCollection.doc(id).set(item);
  }
}
