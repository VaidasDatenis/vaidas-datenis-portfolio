export interface IGeometry {
    type: string;
    address: string;
    coordinates: number[];
    floor: string;
    image: string;
    link: string;
    price: string;
    rooms: string;
    square_price: string;
    total_square: string;
  }
  
  export interface IApartGeoJson {
    type: string;
    geometry: IGeometry;
    address: string;
    coordinates: number[];
    floor: string;
    image: string;
    link: string;
    price: string;
    rooms: string;
    square_price: string;
    total_square: string;
    properties?: any;
    $key?: string;
  }
  
  export class ApartGeoJson implements IApartGeoJson {
    type = 'Feature';
    geometry: IGeometry;
    address: 'address';
    coordinates: [];
    floor: 'floor';
    image: 'image';
    link: 'link';
    price: 'price';
    rooms: 'rooms';
    square_price: 'square_price';
    total_square: 'total_square';
  
    constructor(public properties?) {
      this.geometry = {
        type: 'Point',
        address: this.address,
        coordinates: this.coordinates,
        floor: this.floor,
        image: this.image,
        link: this.link,
        price: this.price,
        rooms: this.rooms,
        square_price: this.square_price,
        total_square: this.total_square
      }
    }
  }
  
  export class ApartFeatureCollection {
    type = 'ApartFeatureCollection'
    constructor(public features: Array<ApartGeoJson>) {}
  }