import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Saison } from '../model/saison.model';

@Component({
  selector: 'app-update-saison',
  templateUrl: './update-saison.component.html',
  styles: [
  ]
})
export class UpdateSaisonComponent implements OnInit {


  @Input()
   saison! : Saison;
  @Output()
   saisonUpdated = new EventEmitter<Saison>();

  @Input()
  ajout!:boolean;
  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit du composant updatedSaison ",this.saison);
  }

  saveSaison(){
    this.saisonUpdated.emit(this.saison);
    }
    

}
