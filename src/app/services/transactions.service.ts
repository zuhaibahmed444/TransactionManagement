import { Injectable } from '@angular/core';
import { Transaction } from '../types/Transactions';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private apiUrl = '/transactions';

  constructor(private http: HttpClient) {}

 
  getTransactions(startDate: number, endDate: number): Observable<Transaction[]> {
    const url = `${this.apiUrl}?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<Transaction[]>(url).pipe(
      map(transactions => transactions.map(transaction => ({
        ...transaction,
        date: new Date(transaction.date).toLocaleDateString() 
      })))
    );
  }

  fetchTransactionById(id: number): Observable<Transaction[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Transaction[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.message);
      })
    );
  }


  updateTransaction(id: string , comment:string): Observable<Transaction> {
    const updateUrl = `${this.apiUrl}/${id}/comment`; 
    return this.http.put<Transaction>(updateUrl, { comment});
  }
}
