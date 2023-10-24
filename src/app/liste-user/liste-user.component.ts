
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-liste-ofusers',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.css']
})
export class ListeOfusersComponent implements OnInit {

  constructor(private authService:AuthService) { }
  users!:User[]
  role?:string;
  

  ngOnInit(): void {
    this.authService.ListOfusers().subscribe(
      data => {
        this.users = data;
        console.log(data);
  
        
      
        
      },
      err => {
        console.log(err);
      }
    );
  }
  deleteUser(id: number) {
    const confirmed = confirm("Are you sure you want to delete this user?");
  
    if (confirmed) {
      this.authService.deleteUser(id).subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  
  

}  
  
  
  
  
  