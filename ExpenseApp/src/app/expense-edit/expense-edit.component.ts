import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.css']
})
export class ExpenseEditComponent implements OnInit {

  angForm: FormGroup;
  expense: any = {};
  constructor(private route: ActivatedRoute,
              private router: Router,
              private es: ExpenseService,
              private fb: FormBuilder) {
    this.createForm();
   }
   createForm(){
    this.angForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required],
      types: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.es.editExpense(params['id']).subscribe(res => {
        this.expense = res;
    });
  });
  }

  get f() {return this.angForm.controls; }

  updateExpense(description, amount, date, types, id) {
    this.route.params.subscribe(params => {
      this.es.updateExpense(description, amount, date, types, params.id).subscribe((data: string) => {
        console.log(data);
        this.router.navigate(['expenses']);
      }) ;
      // this.router.navigate(['expenses']);
    });
  }

}
