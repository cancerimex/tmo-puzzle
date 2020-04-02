import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StocksComponent } from './stocks.component';
import { StocksDataAccessPriceQueryModule } from '@coding-challenge/stocks/data-access-price-query';
import { 
  MatFormFieldModule, 
  MatSelectModule, 
  MatOptionModule, 
  MatButtonModule, 
  MatInputModule 
} from '@angular/material';
import { STOCKSAPPCONFIGTOKEN } from '@coding-challenge/stocks/data-access-app-config';
import { NxModule } from '@nrwl/nx';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  let priceQueryFacade: PriceQueryFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        StocksDataAccessPriceQueryModule,
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      declarations: [ StocksComponent ],
      providers: [
        {
          provide: STOCKSAPPCONFIGTOKEN,
          useValue: {
            production: false,
            apiKey: '',
            apiURL: ''
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    priceQueryFacade = TestBed.get(PriceQueryFacade);
    spyOn(priceQueryFacade, 'fetchQuote');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('StockPickerForm', () => {
    it('should be invalid when empty', () => {
      expect(component.stockPickerForm.valid).toBeFalsy();
    });

    it('should be invalid if only two values are set', () => {
      component.stockPickerForm.patchValue({ symbol: 'AAPL', periodFrom: '3/23/2020' });
      expect(component.stockPickerForm.valid).toBeFalsy();
    });

    it('should be valid all values are set', () => {
      component.stockPickerForm.patchValue({ symbol: 'AAPL', periodFrom: '3/23/2020', periodTo: '3/27/2020' });
      expect(component.stockPickerForm.valid).toBeTruthy();
    });

    it('should change the periodTo value if its less than periodFrom', () => {
      const periodFrom = component.stockPickerForm.controls['periodFrom'];
      const periodTo = component.stockPickerForm.controls['periodTo'];
      component.stockPickerForm.setValue({ symbol: 'AAPL', periodFrom: '3/23/2020', periodTo: '3/21/2020' });
      fixture.detectChanges();
      expect(periodFrom.value).toEqual('3/23/2020');
      expect(periodTo.value).toEqual('3/23/2020');
    });

    it('should call fetchQuote', () => {
      component.stockPickerForm.setValue({ symbol: 'AAPL', periodFrom: '3/23/2020', periodTo: '3/27/2020' });
      component.fetchQuote();
      expect(priceQueryFacade.fetchQuote).toHaveBeenCalled();
      expect(priceQueryFacade.fetchQuote).toHaveBeenCalledWith('AAPL', '3/23/2020', '3/27/2020');
    });

    describe('Input', () => {
      it('should be invald if nothing is set', () => {
        const symbol = component.stockPickerForm.controls['symbol'];
        expect(symbol.valid).toBeFalsy();
      });

      it('should have an error when touched but empty ', () => {
        const symbol = component.stockPickerForm.controls['symbol'];
        symbol.setValue('');
        expect(symbol.hasError('required')).toBeTruthy();
      });

      it('should be valid it is set', () => {
        const symbol = component.stockPickerForm.controls['symbol'];
        expect(symbol.valid).toBeFalsy();
        component.stockPickerForm.patchValue({ symbol: 'AAPL' });
        expect(symbol.valid).toBeTruthy();
      });
    });
    
  });
});
