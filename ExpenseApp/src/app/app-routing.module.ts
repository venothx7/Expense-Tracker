import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseAddComponent } from './expense-add/expense-add.component';
import { ExpenseEditComponent } from './expense-edit/expense-edit.component';


const routes: Routes = [
  {
    path: 'expenses',
    component: ExpenseListComponent
  },
  {
    path: 'expenses/add',
    component: ExpenseAddComponent
  },
  {
    path: 'expenses/edit/:id',
    component: ExpenseEditComponent
  } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
