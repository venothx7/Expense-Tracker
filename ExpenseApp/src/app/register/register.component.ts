import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  angForm: FormGroup;
  // submitted = false;

  constructor(private fb: FormBuilder, 
              private _auth : AuthService,
              private _router: Router) {
    this.createForm();
  }

  createForm(){
    this.angForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      // confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
  }
  registerUser(username, email, password){
    this._auth.registerUser(username, email, password)
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

  // addUser(username, email, password){
  //   this.userService.addUer(username, email, password);
  // }

}
