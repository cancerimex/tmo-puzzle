import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { TimePeriod } from './stocks.model';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
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
  public maxDateFrom = new Date();
  public maxDateTo = new Date();

  private formValueSubscription: Subscription;

  constructor(private _fb: FormBuilder, private _priceQuery: PriceQueryFacade) {}

  ngOnInit(): void { 
    this.stockPickerForm = this._fb.group({
      symbol: [null, Validators.required],
      periodFrom: [null, [Validators.required, this.validateDate]],
      periodTo: [null, [Validators.required, this.validateDate]]
    });

    this.formValueSubscription = this.stockPickerForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(() => this.fetchQuote());
  }

  ngOnDestroy(): void {
    if (this.formValueSubscription) {
      this.formValueSubscription.unsubscribe();
    }
  }

  public fetchQuote(): void {
    if (this.stockPickerForm.valid) {
      const { symbol, periodFrom, periodTo } = this.stockPickerForm.value;
      this._priceQuery.fetchQuote(symbol, periodFrom, periodTo);
    }
  }

  public validateDate(input: FormControl) {
    if (!input.root || !input.root['controls']) {
      return null;
    }
    const controls = input.root['controls'];
    if (controls.periodFrom.value 
        && controls.periodTo.value) {
      return (controls.periodFrom.value > controls.periodTo.value) 
        ? controls.periodTo.setValue(controls.periodFrom.value)
        : null
    }
    return null;
  }
}
