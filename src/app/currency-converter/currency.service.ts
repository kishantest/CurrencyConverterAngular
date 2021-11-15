import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConvertCurrency, ConvertCurrencyResult, Currency, CurrencyListResult } from './currency';
import { environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

 private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<CurrencyListResult> {

    return this.http.get<CurrencyListResult>(this.baseUrl + '/Currency/GetCurrencies')
      .pipe(
        catchError(this.handleError)
      );
  }

  getCurrencyExchangeDetail(convertCurrency: ConvertCurrency): Observable<ConvertCurrencyResult> {
    //console.log(convertCurrency);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //const body = {
    //  'fromCurrencyCode': convertCurrency.fromCurrencyCode,
    //  'toCurrencyCode': convertCurrency.toCurrencyCode,
    //  'amount': convertCurrency.amount
    //}
    return this.http.post<ConvertCurrencyResult>(this.baseUrl + '/Currency/GetCurrencyExchangeDetail', convertCurrency, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
