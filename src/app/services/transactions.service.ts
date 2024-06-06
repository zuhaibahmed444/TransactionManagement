import { Injectable } from '@angular/core';
import { Transaction } from '../types/Transactions';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor() { }

  private transactions: Transaction[] = [{
    "id": "1",
    "date": 1639502071000,
    "sender": {
    "firstName": "John",
    "lastName": "Smith",
    "dateOfBirth":"1970-01-23",
    "IDNumber":"100001"
    },
    "recipient": {
    "firstName": "Jane",
    "lastName": "doe",
    "email":"janedoe@company.com",
    "accountNumber":"200001",
    "bank":"TD"
    },
    "Amount": 100.00,
    "CurrencyCd": "CAD",
    "Comments":"Utility bill",
    "status": "COMPLETED"
    },
    {
    "id": "2",
    "date": 1639486575000,
    "sender": {
    "firstName": "John2",
    "lastName": "Smith",
    "dateOfBirth":"1970-02-23",
    "IDNumber":"100001"
    },
    "recipient": {
    "firstName": "Jane2",
    "lastName": "doe",
    "email":"janedoe@company2.com",
    "accountNumber":"200001",
    "bank":"TD"
    },
    "Amount": 100.00,
    "CurrencyCd": "USD",
    "Comments":"Rent",
    "status": "PENDING"
    },
    {
    "id": "3",
    "date": 1639478930000,
    "sender": {
    "firstName": "John3",
    "lastName": "Smith",
    "dateOfBirth":"1970-03-23",
    "IDNumber":"100001"
    },
    "recipient": {
    "firstName": "Jane3",
    "lastName": "doe",
    "email":"janedoe@company3.com",
    "accountNumber":"200001",
    "bank":"CIBC"
    },
    "Amount": 300.00,
    "CurrencyCd": "USD",
    "Comments":"Insurance Premium",
    "status": "IN PROGRESS"
    },
    {
    "id": "4",
    "date": 1638997755000,
    "sender": {
    "firstName": "John4",
    "lastName": "Smith",
    "dateOfBirth":"1970-04-23",
    "IDNumber":"100001"
    },
    "recipient": {
    "firstName": "Jane4",
    "lastName": "doe",
    "email":"janedoe@company4.com",
    "accountNumber":"200001",
    "bank":"RBC"
    },
    "Amount": 200.00,
    "CurrencyCd": "CAD",
    "Comments":"Cash Transfer",
    "status": "REJECTED"
    }]
  getTransactions(): Observable<Transaction[]> {
    return of(this.transactions);
  }

  updateTransaction(updatedTransaction: Transaction): void {
    const index = this.transactions.findIndex(t => t.id === updatedTransaction.id);
    if (index !== -1) {
      this.transactions[index] = updatedTransaction;
    }
  }
}
