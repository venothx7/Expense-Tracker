import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-expense-add',
  templateUrl: './expense-add.component.html',
  styleUrls: ['./expense-add.component.css']
})
export class ExpenseAddComponent implements OnInit {

  angForm: FormGroup;
  // submitted = false;

  constructor(private fb: FormBuilder,
              private expenseService: ExpenseService,
              private _router: Router,
              private route: ActivatedRoute) {
    this.createForm();
  }

  createForm(){
    this.angForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required],
      types: ['', Validators.required]
      // confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
  }
  get f() {return this.angForm.controls; }

  addExpense(description, amount, date, types){
    this.route.params.subscribe(params => {
      this.expenseService.addExpense(description, amount, date, types)
      .subscribe((data: string) => {
        console.log(data);
        this._router.navigate(['expenses']);
      }) ;

    });
    // this._router.navigateByUrl('/expenses');
  }

}
