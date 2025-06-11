import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl = 'http://localhost:5000/auth';

  constructor(private http:HttpClient) { }

  register(userData: RegisterData) {
    return this.http.post(`${this.baseUrl}/register`, {userData});
  }

  login( username: string, password: string ) {
    return this.http.post(`${this.baseUrl}/login`, {username,password});
  }

  get islogedin(){
    let token=localStorage.getItem('token');
    if(token){
      return true;
    }
    return false;
  }
  // get isadmin(){
  //   let userdata=localStorage.getItem('user');
  //   if(userdata){
  //     return JSON.parse(userdata).isAdmin;
  //   }

  //   return false;
  // }
  get username(){
    let userdata=localStorage.getItem('user');
    if(userdata){
      return JSON.parse(userdata).username;
    }
    return null;
  }
  
   getCurrentUserId(): string | null {
   let userdata=localStorage.getItem('user');
   console.log(userdata);

   if(userdata){
     return JSON.parse(userdata).id;
    }

    return null;
  }

  get email(){
    let userdata=localStorage.getItem('user');
    if(userdata){
      return JSON.parse(userdata).email;
    }
    return null;
  }

  logout(){
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

}
