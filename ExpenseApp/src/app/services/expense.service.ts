import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  uri = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  addExpense(description, amount, date, types) {
    // console.log("made it here");
    const obj = { description, amount, date, types };
    // console.log(obj);
    return this.http.post(`${this.uri}/expense/add`, obj);
        // .subscribe(res => console.log('Added'));
  }
  getExpenses() {
    return this.http.get(`${this.uri}/expense`);
  }

  editExpense(id: any) {
    return this.http.get(`${this.uri}/expense/edit/${id}`); 
  }

  updateExpense(description, amount, date, types, id) {
    const obj = {description, amount, date, types, id};
    // console.log(obj);
    return this
      .http
      .post(`${this.uri}/expense/update/${id}`, obj);
      // .subscribe(res => console.log('updated') );
  }

  deleteExpense(id) {
    return this
              .http
              .delete(`${this.uri}/expense/delete/${id}`);
  }


}
