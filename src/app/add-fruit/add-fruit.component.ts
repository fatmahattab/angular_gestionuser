import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fruit } from '../model/fruit.model';
import { Image } from '../model/image.model';
import { Saison } from '../model/saison.model';
import { FruitService } from '../services/fruit.service';

@Component({
  selector: 'app-add-fruit',
  templateUrl: './add-fruit.component.html',
  styleUrls: ['./add-fruit.component.css']
})
export class AddFruitComponent implements OnInit {
  newFruit = new Fruit();
  message: string="";
  saisons! : Saison[];
  newIdSai! : number;
 newSaison! : Saison;
 uploadedImage!: File;
 imagePath: any;
  constructor(private fruitService: FruitService,
    private router:Router) { 
      

  }

  ngOnInit(): void {
   // this.saisons = this.fruitService.listeSaison();
   this.fruitService. listeSaison().
    subscribe(sais =>{console.log(sais);
      this.saisons = sais._embedded.saisons;
      
    });
  }
/*  
    


    addFruit(){
      this.fruitService.ajouterFruit(this.newFruit)
      .subscribe(frui=> {
      console.log(frui);
      this.router.navigate(['fruits']);
      });
      } */
      /*addFruit(){
        this.newFruit.saison = this.saisons.find(sai => sai.idSai == this.newIdSai)!;
        this.fruitService.ajouterFruit(this.newFruit)
        .subscribe(prod => {
        console.log(prod);
        this.router.navigate(['fruits']);
        });
        }*/
      /* addFruit(){
          this.fruitService
          .uploadImage(this.uploadedImage, this.uploadedImage.name)
          .subscribe((img: Image) => {
          this.newFruit.image=img;
          this.newFruit.saison = this.saisons.find(cat => cat.idSai
          == this.newIdSai)!;
          this.fruitService
          .ajouterFruit(this.newFruit)
          .subscribe(() => {
          this.router.navigate(['fruits']);
          });
          });
          }*/
       addFruit(){
            this.newFruit.saison = this.saisons.find(cat => cat.idSai
            == this.newIdSai)!;
            this.fruitService
            .ajouterFruit(this.newFruit)
            .subscribe((prod) => {
            this.fruitService
            .uploadImageFrui(this.uploadedImage,
            this.uploadedImage.name,prod.idFruit)
            .subscribe((response: any) => {}
            );
            this.router.navigate(['fruits']);
            });
            }

        onImageUpload(event: any) {
          this.uploadedImage = event.target.files[0];
          var reader = new FileReader();
          reader.readAsDataURL(this.uploadedImage);
          reader.onload = (_event) => { this.imagePath = reader.result; }
          }
      

}
