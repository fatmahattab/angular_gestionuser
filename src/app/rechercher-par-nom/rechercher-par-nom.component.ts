import { Component, OnInit } from '@angular/core';
import { Fruit } from '../model/fruit.model';
import { FruitService } from '../services/fruit.service';

@Component({
  selector: 'app-rechercher-par-nom',
  templateUrl: './rechercher-par-nom.component.html',
  styles: [
  ]
})
export class RechercherParNomComponent implements OnInit {
 nomFruit!:string;
 fruits!:Fruit[];
 allFruits! :Fruit[];
 searchTerm!: string;

  constructor(private fruitService : FruitService ) { }

  ngOnInit(): void {
    this.fruitService.listeFruit().subscribe(prods => {
      console.log(prods);
      this.fruits = prods;
      });
  }

  rechercherFrui(){

    this.fruitService.rechercherParNom(this.nomFruit).
    subscribe(prods => {
    this.fruits = prods;
    console.log(prods)});
  }

  onKeyUp(filterText : string){
    this.fruits = this.allFruits.filter(item =>
    item.nomFruit.toLowerCase().includes(filterText));
    }

}
