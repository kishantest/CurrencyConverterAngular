import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConvertCurrency, ConvertCurrencyResult, Currency } from './currency';
import { CurrencyService } from './currency.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  currencies: Array<Currency> = [];
  convertCurrencyResult: ConvertCurrencyResult | undefined;
  convertCurrency: ConvertCurrency | undefined;
  currencyForm: FormGroup = this.fb.group(
    {
      amount: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(15)]],
      fromcurrency: ['', Validators.required],
      tocurrency: ['', Validators.required]
    }
  );
  errorMessage = '';

  constructor(private fb: FormBuilder, private currencyService: CurrencyService) { }

  ngOnInit(): void {

    this.currencyService.getCurrencies().subscribe(data => {
      this.currencies = data.currencies;
      //console.log(this.currencies);
    },
      error => this.errorMessage = <any>error
    );

  }

  CalculateExchangeValue(): void {

    if (this.currencyForm.valid) {
      if (this.currencyForm.dirty) {
        //console.log(this.currencyForm.value);
        this.convertCurrency = {
          fromCurrencyCode: this.currencyForm.value.fromcurrency,
          toCurrencyCode: this.currencyForm.value.tocurrency,
          amount: +this.currencyForm.value.amount
        }
        //console.log(this.convertCurrency);

        this.currencyService.getCurrencyExchangeDetail(this.convertCurrency)
          .subscribe(data => {
            this.convertCurrencyResult = data;
            console.log(this.convertCurrencyResult);
          },
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
    else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

}
