import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Case } from 'src/app/case.model';


@Injectable({
  providedIn: 'root'
})
export class WorldTableService {

  constructor(private firestore: AngularFirestore) { }

  getTableData() {
    return this.firestore.collection('cases').snapshotChanges();
  }

  getDataById(val) {
    return this.firestore.collection('cases').doc(val).valueChanges();
  }

  updateWorldData(guid, data) {
    this.firestore.doc(`cases/${guid}`).update(data);
  }

  deleteWorlRecord(model) {
    return this.firestore.doc(`cases/${model.id}`).delete();
  }

}
