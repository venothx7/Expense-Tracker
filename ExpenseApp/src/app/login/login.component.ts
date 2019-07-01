import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  angForm: FormGroup;
  // submitted = false;

  constructor(private fb: FormBuilder,
              private _auth : AuthService,
              private _router: Router) {
    this.createForm();
  }

  createForm(){
    this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      // confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
  }

  loginUser(email, password){
    this._auth.loginUser(email, password)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this._router.navigateByUrl('/expenses');
      },
      err => console.log(err)
    );
  }
  get f() {return this.angForm.controls; }

}
