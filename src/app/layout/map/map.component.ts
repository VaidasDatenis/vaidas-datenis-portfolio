import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapboxService } from '../../shared/services/mapbox.service';
import { GeoJson, FeatureCollection } from './map';

var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

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
  marker: any;
  newMarker: GeoJson;
  public showOrNot: boolean = false;
  public loadImage: string;
  public loadLink: string;
  // public currentImage: any;

  constructor(private mapboxService: MapboxService) { }

  ngOnInit() {
    this.markers = this.mapboxService.getJobsData();
    this.apartments = this.mapboxService.getApartmentsData();
    this.initializeMap();
  }

  public showImage(data) {
    this.apartments.subscribe(res => {
      this.currentImage(data);
      console.log(res[data]);
      console.log(this.showOrNot);
      // this.currentImage = res[data];
      this.loadLink = res[data].link;
      this.loadImage = res[data].image;
      this.showOrNot = !this.showOrNot;
    });
  }

  public currentImage(data) {
    this.apartments.subscribe(res => {
      return res[data];
    });
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

    this.map.on("load", function () {
      /* Image: An image is loaded and added to the this.map. */
      this.map.loadImage("assets/mapboxIcon.png", function(error, image) {
        if (error) throw error;
        this.map.addImage("custom-marker", image);
        /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the this.map. */
        this.map.addLayer({
          id: "markers",
          type: "symbol",
          /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
          source: {
            type: "geojson",
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {
                    title: this.marker.title,
                    description: this.marker.location
                  },
                  geometry: {
                    type: "Point",
                    coordinates: [25.2887, 54.6874]
                  }
                }
              ]
            }
          },
          layout: {
            "icon-allow-overlap": true,
            "icon-image": "custom-marker",
            "icon-size": 0.5
          }
        });
      });
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    // add marker on click
    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat];
      this.coords = coordinates;
      console.log(this.coords);
      this.newMarker = new GeoJson(coordinates, { message: this.message });
      // this.mapboxService.createMarker(newMarker);
    });
    this.map.addSource('firebase', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });
    this.map.on('styledata', () => {
      this.map.addLayer({
        id: 'firebase',
        source: 'firebase',
        type: 'symbol',
        layout: {
          'text-field': '{message}',
          'text-size': '16',
          'text-transform': 'uppercase',
          'icon-image': 'rocket-15',
          'text-offset': [0, 1.5]
        },
        paint: {
          'text-color': '#f16624',
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      });
    });
    this.source = this.map.getSource('firebase');
    this.markers.subscribe(markers => {
      const data = new FeatureCollection(markers);
      this.source.setData(data);
    });
  }

  createMarker(marker) {
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = "url(assets/mapboxIcon.png)";
    el.style.width = '20px';
    el.style.height = '20px';
    this.marker = new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(this.map);
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.coordinates
    });
    // this.createMarker(data.coordinates);
  }

}
