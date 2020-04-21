import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { AngularFirestore } from '@angular/fire/firestore';
import { GeoJson } from '../../layout/map/map';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  constructor(private firestore: AngularFirestore) { 
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  getJobsData() {
    return this.firestore.collection('jobs').valueChanges();
  }

  createMarker(data: GeoJson) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('jobs').add(data).then(res => { console.log(res) }, err => reject(err));
    })
  }

  removeMarker(model) {
    return this.firestore.doc(`jobs/${model.$key}`).delete();
  }

  getJobById(val) {
    return this.firestore.collection('jobs').doc(val).valueChanges();
  }
}