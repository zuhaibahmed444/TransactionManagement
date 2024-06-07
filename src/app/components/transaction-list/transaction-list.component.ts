import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Transaction } from 'src/app/types/Transactions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  displayedColumns: string[] = ['id', 'date', 'comments', 'action'];
  dateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionsService,
    private router: Router,
    private authService : AuthService
  ) {}

  ngOnInit() {
    this.dateForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  fetchTransactions() {
    const startDate = new Date(this.dateForm.value.startDate).getTime();
    const endDate = new Date(this.dateForm.value.endDate).getTime();

    this.transactionService.getTransactions(startDate, endDate).subscribe(data => {
      this.transactions = data;
    });
  }

  viewTransaction(id: number) {
    this.router.navigate(['/transaction-detail', id]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
}
}
