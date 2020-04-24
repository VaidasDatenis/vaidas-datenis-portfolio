import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapboxService } from '../../shared/services/mapbox.service';
import { GeoJson, FeatureCollection } from './jobs';
import { ApartGeoJson, ApartFeatureCollection } from './apartments';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MapboxService]
})
export class MapComponent implements OnInit {
  // default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 54.687157;
  lng = 25.279652;
  message = '';
  coords: any;
  // data
  source: any;
  markers: any = {};
  apartments: any = {};
  marker: mapboxgl.Marker;
  public showOrNot: boolean = false;
  index: number = 0;

  constructor(private mapboxService: MapboxService) { }

  ngOnInit() {
    this.markers = this.mapboxService.getJobsData();
    this.apartments = this.mapboxService.getApartmentsData();
    this.initializeMap();
    this.map.featureLayer().setGeoJSON(this.markers).addTo(this.map);
    this.map.featureLayer().setGeoJSON(this.apartments).addTo(this.map);
  }

  public showImage(i): void {
    if (this.index == i && this.showOrNot) {
      this.index = null;
     } else {
       this.showOrNot = true;
       this.index = i;
     }
  }

  private initializeMap() {
    // locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        })
      })
    }
    this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 16,
      center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());
    // add marker on click
    // this.map.on('click', (event) => {
    //   const coordinates = [event.lngLat.lng, event.lngLat.lat];
    //   this.coords = coordinates;
    // });
    this.map.addSource('firebase', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });

    this.source = this.map.getSource('firebase');
    // jobs
    this.markers.subscribe(markers => {
      const data = new FeatureCollection(markers);
      this.source.setData(data);
    });
    // apartments
    this.apartments.subscribe(apart => {
      const data = new ApartFeatureCollection(apart);
      this.source.setData(data);
    })

    this.map.addLayer({
      id: 'firebase',
      source: 'firebase',
      type: 'symbol',
      layout: {
        'text-size': '16',
        'icon-image': 'rocket-15',
        'text-offset': [0, 1.5]
      },
      paint: {
        'text-color': '#f16624',
        'text-halo-color': '#fff',
        'text-halo-width': 2
      }
    });
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.coordinates
    });
    this.marker = new mapboxgl.Marker()
      .setLngLat(data.coordinates).addTo(this.map);
    this.map.on('click', (mark) => {
      const popup = new mapboxgl.Popup({ closeOnClick: true })
        .setLngLat(data.coordinates)
        .setHTML(`<div>
                    <img src="${data.logo}" style="width: 220px; heigth: 180px; border-radius: 2%;" />
                    <br />
                    <i>Salary: ${data.salary}&euro;</i>
                  </div>`)
        .addTo(this.map);
    })
  }

  goTo(data: ApartGeoJson) {
    this.map.flyTo({
      center: data.coordinates
    });
    this.marker = new mapboxgl.Marker()
      .setLngLat(data.coordinates).addTo(this.map);
    this.map.on('click', (mark) => {
      const popup = new mapboxgl.Popup({ closeOnClick: true })
        .setLngLat(data.coordinates)
        .setHTML(`<div>
                    <i>Price: ${data.price}</i>
                    <br />
                    <img src="${data.image}" style="width: 220px; heigth: 180px; border-radius: 2%;" />
                  </div>`)
        .addTo(this.map);
      }
    );
  }

}
