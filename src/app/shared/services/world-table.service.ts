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
    // this.firestore.collection('cases').doc(guid.payload.doc.data).set({ completed: true }, { merge: true });
    // delete data.id;
    console.log('Updating...');
    console.log(guid);
    console.log(data);
    // this.firestore.collection('cases').doc(data.id).collection(data).update(data);
    this.firestore.doc(`cases/${guid}`).update({ rating: data });
    console.log('Updated!');
  }

  // deleteWorlRecord(dataId: string) {
  //   // this.firestore.collection('cases').doc(dataId).delete();
  //   console.log('Deleting...');
  //   this.firestore.doc('cases/' + dataId).delete();
  //   console.log('Deleted!');
  // }
  deleteWorlRecord(model) {
    return this.firestore.collection('cases').doc(model.payload.doc.id).delete();
  }

}
