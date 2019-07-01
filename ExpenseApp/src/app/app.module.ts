import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseAddComponent } from './expense-add/expense-add.component';
import { ExpenseEditComponent } from './expense-edit/expense-edit.component';
import { ExpenseService} from './services/expense.service';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseListComponent,
    ExpenseAddComponent,
    ExpenseEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ExpenseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
