import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Saison } from '../model/saison.model';
import { FruitService } from '../services/fruit.service';


@Component({
  selector: 'app-liste-saisons',
  templateUrl: './liste-saisons.component.html',
  styles: [
  ]
})
export class ListeSaisonsComponent implements OnInit {
 saisons!:Saison[];
 ajout:boolean=true;
 updatedSai:Saison = {"idSai":0,"nomSai":""};
  constructor(private fruitService : FruitService,
              private router:Router) { }

  ngOnInit(): void {
/*     this.fruitService.listeSaison().
    subscribe(cats => {this.saisons = cats._embedded.saisons;
    console.log(cats);
    }); */
    this.chargerSaison();
  }
  chargerSaison(){
    this.fruitService.listeSaison().
    subscribe(cats => {this.saisons = cats._embedded.saisons;
    console.log(cats);
    });
    
    }
  saisonUpdated(sai:Saison){
    console.log("Sai updated event",sai);
    this.fruitService.ajouterSaison(sai).
     subscribe( ()=> this.chargerSaison());
    
    
    }
    updateSai(sai:Saison) {
      this.updatedSai=sai;
      this.ajout=false; 
      
      }
      

}
