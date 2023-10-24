import { Saison } from "./saison.model";
import { Image } from "./image.model";
export class Fruit{
    idFruit! : number;
    nomFruit! : string;
    prixFruit! : number;
    datedebutsaison! : Date ;
    saison!:Saison;
    image! : Image;
    imageStr!:string;
    images!: Image[];
    }
    