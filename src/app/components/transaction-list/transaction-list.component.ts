import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Transaction } from 'src/app/types/Transactions';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[] = [];
  displayedColumns: string[] = ['id', 'date', 'comments', 'action']; 
  constructor(private transactionService: TransactionsService, private router: Router) {}
  ngOnInit() {
    this.transactionService.getTransactions().subscribe(data => {
      this.transactions = data;
    });
  }

  viewTransaction(id: number) {
    this.router.navigate(['/transaction-detail', id]);
  }
}
