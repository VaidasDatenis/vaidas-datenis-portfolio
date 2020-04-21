export interface IGeometry {
  type: string;
  coordinates: number[];
  address: string;
}

export interface IGeoJson {
  type: string;
  geometry: IGeometry;
  address: string;
  properties?: any;
  $key?: string;
}

export class GeoJson implements IGeoJson {
  type = 'Feature';
  geometry: IGeometry;
  address: 'address';

  constructor(coordinates, address, public properties?) {
    this.geometry = {
      type: 'Point',
      coordinates: coordinates,
      address: address
    }
  }
}

export class FeatureCollection {
  type = 'FeatureCollection'
  constructor(public features: Array<GeoJson>) {}
}