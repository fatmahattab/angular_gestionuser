import { Role } from './../model/role.model';

import { FruitService } from '../services/fruit.service';
import { User } from './../model/user.model';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-add-role-for-user',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleForUserComponent implements OnInit {

  constructor(private authservie: AuthService,private equipeservice:FruitService,private   activatedRoute: ActivatedRoute  ) { }

  User!:User
  Users!:User[]
  roles!:Role[]
  Role!:Role
  idOfRole!:Role
  NewRole!:Role

  RoleToRemove:Role = new Role();

  ngOnInit(): void {
    this.authservie.ListOfusers().subscribe(
      data => {
        this.Users = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
    this.authservie.consulterUser(this.activatedRoute.snapshot.params['id']).subscribe((user) => {
      console.log(user);
      this.User = user;
    

  });
  this.authservie.ListOfRoles().subscribe(
    data => {
      this.roles = data;
      console.log(data);
    },
    err => {
      console.log(err);
    }
  );
  }
  addRoleToUser(){
    console.log(this.idOfRole);
    console.log(this.activatedRoute.snapshot.params['id'])

    
      this.authservie.AddRoleForUser(this.activatedRoute.snapshot.params['id'],this.idOfRole).subscribe((user) => {
        console.log(user);
        this.User = user;
       
      });

    }
    removeRoleFromUsers(id:number){
      console.log("id of the role"+id)
      
      
      
      this.authservie.GetRoleById(id).subscribe((role) => {

        
        this.Role = role;
        console.log("the role"+role.role_id);
        
        
    
      
      console.log(this.activatedRoute.snapshot.params['id'])
  
      
         this.authservie.removeRoleFromUser(this.activatedRoute.snapshot.params['id'],this.Role).subscribe((user) => {
           console.log(user);
           this.User = user;
           
         });
  
      }
      );
    }
 

    
  }

  

