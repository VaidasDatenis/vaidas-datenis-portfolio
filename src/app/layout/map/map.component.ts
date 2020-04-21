import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapboxService } from '../../shared/services/mapbox.service';
import { GeoJson, FeatureCollection } from './map';
import { environment } from '../../../environments/enviroment';

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
  style = 'mapbox://style/mapbox/outdoors-v9';
  lat = 54.687157;
  lng = 25.279652;
  message = '';
  // data
  source: any;
  markers: any = {};

  constructor(private mapboxService: MapboxService) { }

  ngOnInit() {
    this.markers = this.mapboxService.getJobsData();
    this.initializeMap();
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
    const conf = {
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    };
    this.map = new mapboxgl.Map(conf);
    // add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    // add marker on click
    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat];
      const newMarker = new GeoJson(coordinates, { message: this.message });
      this.mapboxService.createMarker(newMarker);
    });

    this.map.addSource('firebase', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });

    this.source = this.map.getSource('firebase');
    this.markers.subscribe(markers => {
      const data = new FeatureCollection(markers);
      this.source.setData(data);
    });
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
    this.map.addControl(new MapboxGeocoder({
      accessToken: environment.mapbox.accessToken,
      localGeocoder: this.forwardGeocoder,
      zoom: 14,
      mapboxgl: mapboxgl
    }));
  }

  forwardGeocoder(query) {
    const matchingFeatures = [];
    for (var i = 0; i < this.markers.features.length; i++) {
      const feature = this.markers.features[i];
      if (
        feature.properties.address
        .toLowerCase()
        .search(query.toLowerCase()) !== -1
      ) {
        feature['place_name'] = '🌲 ' + feature.properties.title;
        feature['center'] = feature.geometry.address;
        feature['place_type'] = ['park'];
        matchingFeatures.push(feature);
      }
    }
  }

  removeMarker(marker) {
    this.mapboxService.removeMarker(marker.$key);
  }

  flyTo(data: GeoJson) {
    console.log(data.address);
    this.map.flyTo({
      center: data.address
      // coordinates
    })
  }

}
