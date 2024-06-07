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
  error: any;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private transactionService: TransactionsService,
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.transactionService.fetchTransactionById(id).subscribe(transactions => {
      this.transaction = transactions.find(t => t.id === id.toString())!;
      this.error = null;
      this.transactionForm = this.fb.group({
        id: [{ value: this.transaction.id, disabled: true }],
        date: [{ value: new Date(this.transaction.date).toLocaleDateString(), disabled: true}],
        comments: [this.transaction.comments, [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]]
      });
    },error => {
      this.error = error.message;
    });
  }

  save() {
    if (this.transactionForm.valid) {
      const comment = this.transactionForm.get('comments')?.value;
      const id = +this.route.snapshot.paramMap.get('id')!
      this.transactionService.updateTransaction(id.toString(),comment).subscribe(updatedTransaction => {
        this.router.navigate(['/transaction-list']);
      }, error => {
        console.log(error)
      });
    }
  }

  ngAfterViewInit() {
    this.commentsInput.nativeElement.focus();
  }

}
