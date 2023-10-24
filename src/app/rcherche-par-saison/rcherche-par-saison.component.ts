import { Component, OnInit } from '@angular/core';
import { Fruit } from '../model/fruit.model';
import { Saison } from '../model/saison.model';
import { FruitService } from '../services/fruit.service';

@Component({
  selector: 'app-rcherche-par-saison',
  templateUrl: './rcherche-par-saison.component.html',
  styles: [
  ]
})
export class RchercheParSaisonComponent implements OnInit {

  fruits!:Fruit[];
  saisons !: Saison[];
  IdSaison!:number;
  constructor(private fruitService : FruitService ){ }

  ngOnInit(): void {
    //this.saisons=this.fruitService.listeSaison();
    //this.fruits=[];
    this.fruitService.listeSaison().
subscribe(sais => {this.saisons = sais._embedded.saisons;
console.log(sais);
});

  }

  onChange(){
    //console.log(this.IdSaison)
    //this.fruits=this.fruitService.rchercheParSaison(this.IdSaison);
    this.fruitService.rchercheParSaison(this.IdSaison).
    subscribe(frui =>{this.fruits=frui});
    
      //this.fruitService.rchercheParSaison(this.IdSaison).
      //subscribe(frui =>{this.fruits=frui});
    
  }
  chargerFruits(){
    this.fruitService.listeFruit().subscribe(fr => {
      console.log(fr);
      this.fruits = fr;
      });
    }
    



    
supprimerFruit(f: Fruit)
{
let conf = confirm("Etes-vous sûr ?");
if (conf)
this.fruitService.supprimerFruit(f.idFruit).subscribe(() => {
console.log("fruit supprimé");
this.chargerFruits();
});
} 
  
}
