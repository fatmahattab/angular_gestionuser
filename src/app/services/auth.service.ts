import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from '../model/role.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //users: User[] = [{"username":"admin","password":"123","roles":['ADMIN']},
  //                {"username":"fatma","password":"123","roles":['USER']} ];
 

apiURL: string = 'http://localhost:8081/users';
token!:string;
private helper = new JwtHelperService();
  public loggedUser!:string;
  public isloggedIn: Boolean = false;
  public roles!:string[];

  constructor(private router: Router, private http : HttpClient) { }
  login(user : User)
{
return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'});
}
saveToken(jwt:string){
  localStorage.setItem('jwt',jwt);
  this.token = jwt;
  this.isloggedIn = true;
  this.decodeJWT();
  }
  decodeJWT()
  { if (this.token == undefined)
   return;
  const decodedToken = this.helper.decodeToken(this.token);
  this.roles = decodedToken.roles;
  console.log("roles"+this.roles);
  this.loggedUser = decodedToken.sub;
  }
  loadToken() {
  this.token = localStorage.getItem('jwt')!;
  this.decodeJWT();
  }
  getToken():string {
  return this.token;
  }
  isTokenExpired(): Boolean
  {
  return this.helper.isTokenExpired(this.token); }


  logout() {
    this.loggedUser = undefined!;
this.roles = undefined!;
this.token= undefined!;
this.isloggedIn = false;
localStorage.removeItem('jwt');
this.router.navigate(['/login']);
    /*this.isloggedIn = false;
    this.loggedUser = undefined!;
    this.roles = undefined!;
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['/login']);*/
  }
  /*SignIn(user: User): Boolean {
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if (user.username == curUser.username && user.password == curUser.password) {
        validUser = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  }*/
  isAdmin(): Boolean {
    if (!this.roles)
 return false;
return this.roles.indexOf('ADMIN') >=0;
  }

  setLoggedUserFromLocalStorage(login : string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    //this.getUserRoles(login);
    }
   /* getUserRoles(username :string){
    this.users.forEach((curUser) => {
    if( curUser.username == username ) {
    this.roles = curUser.roles;
    }
    });
    }*/
    ListOfusers():Observable<User[]>
  {
    let jwt = this.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<User[]>(this.apiURL+"/all", {headers:httpHeaders});
    
    
  }
  consulterUser(id: number): Observable<User> {
    let jwt = this.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.apiURL + '/findUserById'}/${id}`;
    return this.http.get<User>(url,{headers:httpHeaders});
    }

    ListOfRoles():Observable<Role[]>
  {
    let jwt = this.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Role[]>(this.apiURL+"/allRoles", {headers:httpHeaders});
    
    

  }
  

AddRoleForUser(id:number,r:Role):Observable<User>
{
  let jwt = this.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  const url=`${this.apiURL}/addRole/${id}`
  return this.http.post<User>(url,r, {headers:httpHeaders});
  
}

Register(u:User):Observable<User>{

  
  return this.http.post<User>(this.apiURL+'/add', u );

}

deleteUser(id: number) {
  let jwt=this.getToken();
  jwt="Bearer "+jwt;
  let httpHeaders=new HttpHeaders({"Authorization":jwt})
  const url=`${this.apiURL}/deleteUserById/${id}`
  return this.http.delete(url,{headers:httpHeaders});
  }

  removeRoleFromUser(id:number,r:Role):Observable<User>
  {
    let jwt = this.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url=`${this.apiURL}/removeRoleFromUer/${id}`
    return this.http.post<User>(url,r, {headers:httpHeaders});
    
  }
  GetRoleById(id:number):Observable<Role>
  {
    let jwt = this.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url=`${this.apiURL}/findRoleById/${id}`
    return this.http.get<Role>(url, {headers:httpHeaders});
    
  }



}
