import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router' ;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registeredUrl = 'http://localhost:3000/api/user/register';
  private _loginUrl = 'http://localhost:3000/api/user/login';

  constructor(private http: HttpClient, private _router: Router) { }

  registerUser(username, email,password) {
    const obj = { username, email, password };
    // console.log(obj);
    return this.http.post<any>(this._registeredUrl, obj);
        // .subscribe(res => console.log('Done'));
  }

  loginUser( email, password) {
    const obj = {email, password};
    console.log(obj);
    return this.http.post<any>(this._loginUrl, obj);
        // .subscribe(res => console.log('Done'));
  }

  loggedIn(){ // if token is in browser return true
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token');
    this._router.navigate(['/user/login']);
  }
}
