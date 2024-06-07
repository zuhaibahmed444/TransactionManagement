import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
  { path: 'transaction-list', component: TransactionListComponent },
  { path: 'transaction-detail/:id', component: TransactionDetailsComponent },
  { path: '',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
