import { Component, OnInit } from '@angular/core';
import { Fruit } from '../model/fruit.model';
import { Image } from '../model/image.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FruitService } from '../services/fruit.service';
import { Saison } from '../model/saison.model';


@Component({
  selector: 'app-update-fruit',
  templateUrl: './update-fruit.component.html',
  styles: [
  ]
})
export class UpdateFruitComponent implements OnInit {
  currentFruit = new Fruit();
  saisons! : Saison[];
updatedSaiId! : number;
myImage! : string;
uploadedImage!: File;
isImageUpdated: Boolean=false;

  constructor(private activatedRoute: ActivatedRoute,
                  private router :Router,
               private fruitService: FruitService) { }

 /* ngOnInit(): void {
      this.fruitService.listeSaison().
      subscribe(sais => {console.log(sais);
              this.saisons = sais._embedded.saisons;
      });


    this.fruitService.consulterFruit(this.activatedRoute.snapshot.params['id']).
    subscribe( prod =>{ this.currentFruit = prod;
      this.updatedSaiId= this.currentFruit.saison.idSai;

      this.fruitService
      .loadImage(this.currentFruit.image.idImage)
      .subscribe((img: Image) => {
      this.myImage = 'data:' + img.type + ';base64,' + img.image;
      });

      } ) ;
      
  }*/

    
  ngOnInit(): void {
    this.fruitService.listeSaison().
    subscribe(cats => {this.saisons = cats._embedded.saisons;
    });
    this.fruitService.consulterFruit(this.activatedRoute.snapshot.params['id'])
    .subscribe( prod =>{ this.currentFruit = prod;
    this.updatedSaiId = prod.saison.idSai;
    } ) ;
    }

    onAddImageFruit() {
      this.fruitService
      .uploadImageFrui(this.uploadedImage,
      this.uploadedImage.name,this.currentFruit.idFruit)
      .subscribe( (img : Image) => {
      this.currentFruit.images.push(img);
      });
      }
   

      supprimerImage(img: Image){
        let conf = confirm("Etes-vous sûr ?");
        if (conf)
        this.fruitService.supprimerImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentProduit.images
        const index = this.currentFruit.images.indexOf(img, 0);
        if (index > -1) {
        this.currentFruit.images.splice(index, 1);
        }
        });
        }
      

 /* updateFruit()
  { //console.log(this.currentProduit);

   // this.currentFruit.saison=this.fruitService.consulterSaison(this.updatedSaiId);


  //this.fruitService.updateFruit(this.currentFruit);
  //this.router.navigate(['fruits']); 
  this.currentFruit.saison = this.saisons.
  find(sai => sai.idSai == this.updatedSaiId)!;
  this.fruitService.updateFruit(this.currentFruit).subscribe(frui => {
    this.router.navigate(['fruits']); }
    );
  }*/
 /*updateFruit() {
    this.currentFruit.saison = this.saisons.find(cat => cat.idSai ==
    this.updatedSaiId)!;
    //tester si l'image du produit a été modifiée
    if (this.isImageUpdated)
    {
    this.fruitService
    .uploadImage(this.uploadedImage, this.uploadedImage.name)
    .subscribe((img: Image) => {
    this.currentFruit.image = img;
    this.fruitService
    .updateFruit(this.currentFruit)
    .subscribe((prod) => {
    this.router.navigate(['fruits']);
    });
    });
    }
    else{
    this.fruitService
    .updateFruit(this.currentFruit)
    .subscribe((prod) => {
    this.router.navigate(['fruits']);
    });
    }
    }*/

    updateFruit() {
      this.currentFruit.saison = this.saisons.find(cat => cat.idSai ==
      this.updatedSaiId)!;
      this.fruitService
      .updateFruit(this.currentFruit)
      .subscribe((prod) => {
      this.router.navigate(['fruits']);
      });
      }

        

  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
    this.uploadedImage = event.target.files[0];
    this.isImageUpdated =true;
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => { this.myImage = reader.result as string; };
    }
    }
  
  

}
