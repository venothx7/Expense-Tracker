import { Component, OnInit } from '@angular/core';
import Expense from '../models/expense';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  expenses: Expense[];
  constructor(private es: ExpenseService) { }

  ngOnInit() {
    this.getExpenses();

  }

  getExpenses(): void {
    this.es
    .getExpenses()
    .subscribe((data: Expense[]) => {
      this.expenses = data;
    });
    }

  deleteExpense(id) {
    this.es.deleteExpense(id).subscribe(res => {
      this.getExpenses();
    });
  }

}
