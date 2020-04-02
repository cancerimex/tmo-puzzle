import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { TimePeriod } from './stocks.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  public stockPickerForm: FormGroup;
  public quotes$: Observable<(string | number)[][]> = this._priceQuery.priceQueries$;
  public timePeriods: Array<TimePeriod> = [
    { viewValue: 'All available data', value: 'max' },
    { viewValue: 'Five years', value: '5y' },
    { viewValue: 'Two years', value: '2y' },
    { viewValue: 'One year', value: '1y' },
    { viewValue: 'Year-to-date', value: 'ytd' },
    { viewValue: 'Six months', value: '6m' },
    { viewValue: 'Three months', value: '3m' },
    { viewValue: 'One month', value: '1m' }
  ];

  constructor(private _fb: FormBuilder, private _priceQuery: PriceQueryFacade) {}

  ngOnInit(): void { 
    this.stockPickerForm = this._fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  public fetchQuote(): void {
    if (this.stockPickerForm.valid) {
      const { symbol, period } = this.stockPickerForm.value;
      this._priceQuery.fetchQuote(symbol, period);
    }
  }
}
