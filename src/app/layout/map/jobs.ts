export interface IGeometry {
  type: string;
  address: string;
  company: string;
  coordinates: number[];
  email: string[];
  location: string;
  salary: string;
  title: string;
  url: string;
  logo: string;
}

export interface IGeoJson {
  type: string;
  geometry: IGeometry;
  address: string;
  company: string;
  coordinates: number[];
  email: string[];
  location: string;
  salary: string;
  title: string;
  url: string;
  logo: string;
  properties?: any;
  $key?: string;
}

export class GeoJson implements IGeoJson {
  type = 'Feature';
  geometry: IGeometry;
  address: 'address';
  coordinates: [];
  company: 'company';
  email: [];
  location: 'location';
  salary: 'salary';
  title: 'title';
  url: 'url';
  logo: 'logo';

  constructor(public properties?) {
    this.geometry = {
      type: 'Point',
      address: this.address,
      company: this.company,
      coordinates: this.coordinates,
      email: [],
      location: this.location,
      salary: this.salary,
      title: this.title,
      url: this.url,
      logo: this.logo
    }
  }
}

export class FeatureCollection {
  type = 'FeatureCollection'
  constructor(public features: Array<GeoJson>) {}
}