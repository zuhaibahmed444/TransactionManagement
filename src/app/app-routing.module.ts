import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';

const routes: Routes = [
  { path: 'transaction-list', component: TransactionListComponent },
  { path: 'transaction-detail/:id', component: TransactionDetailsComponent },
  { path: '', redirectTo: '/transaction-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
