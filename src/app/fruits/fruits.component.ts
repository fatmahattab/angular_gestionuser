import { Component, OnInit } from '@angular/core';
import { Fruit } from '../model/fruit.model';
import { Image } from '../model/image.model';
import { AuthService } from '../services/auth.service';
import { FruitService } from '../services/fruit.service';


@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css']
})
export class FruitsComponent implements OnInit {
  fruits !: Fruit[];
  apiurl:string='http://localhost:8888/fruits/api';
  constructor( private fruitService: FruitService,
                public authService: AuthService) {
   //this.fruits=fruitService.listeFruit();
   }
 
  ngOnInit(): void {
    this.chargerFruits();
    }
    
   /*chargerFruits(){
      this.fruitService.listeFruit().subscribe(prods => {
        this.fruits = prods;

        this.fruits.forEach((prod) => {
          this.fruitService
          .loadImage(prod.image.idImage)
          .subscribe((img: Image) => {
          prod.imageStr = 'data:' + img.type + ';base64,' + img.image;
          });

          }); 

        });
      }*/
  chargerFruits(){
        this.fruitService.listeFruit().subscribe(prods => {
        this.fruits = prods;
        this.fruits.forEach((prod) => {
        prod.imageStr = 'data:' + prod.images[0].type + ';base64,' +
        prod.images[0].image;
        });
        });
        }
        /*chargerFruits(){
          this.fruitService.listeFruit().subscribe(prods => {
          this.fruits = prods;
          });
          }*/
      
 supprimerFruit(f: Fruit)
{
let conf = confirm("Etes-vous sûr ?");
if (conf)
this.fruitService.supprimerFruit(f.idFruit).subscribe(() => {
console.log("fruit supprimé");
this.chargerFruits();
});
} 

  /* supprimerFruit(f:Fruit){
    //console.log(f);
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.fruitService.supprimerFruit(f);
  } */


}
