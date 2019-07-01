import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService,
              private _router: Router){ }
  canActivate(): boolean {
    if(this._authService.loggedIn()){
      return true;
    } else{ // if user not logged in then go to loginpage
      console.log('Hello u cant come here!')
      this._router.navigateByUrl('/user/login');
      return false;
    }
  }


}
