import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Transaction } from 'src/app/types/Transactions';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit , AfterViewInit {
  @ViewChild('commentsInput') commentsInput: ElementRef;

  transaction: Transaction ;
  transactionForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private transactionService: TransactionsService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.transactionService.getTransactions().subscribe(transactions => {
      this.transaction = transactions.find(t => t.id === id.toString())!;
      this.transactionForm = this.fb.group({
        id: [{ value: this.transaction.id, disabled: true }],
        date: [{ value: this.convertTimeStampToDate(this.transaction.date), disabled: true}],
        comments: [this.transaction.Comments, [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]]
      });
    });
  }

  save() {
    if (this.transactionForm.valid) {
      const updatedTransaction: Transaction = {
        id: this.transaction.id,
        date: this.transaction.date,
        Comments: this.transactionForm.get('comments')?.value,
        sender : this.transaction.sender,
        recipient: this.transaction.recipient,
        status: this.transaction.status,
        Amount: this.transaction.Amount,
        CurrencyCd: this.transaction.CurrencyCd
        
      };
      this.transactionService.updateTransaction(updatedTransaction);
      this.router.navigate(['/transaction-list']);
    }
  }

  convertTimeStampToDate(timeStamp: number){
    const date = new Date(timeStamp);
    return date.getDate() + '/' +  date.getMonth() + '/' + date.getFullYear()
  }

  ngAfterViewInit() {
    this.commentsInput.nativeElement.focus();
  }

}
