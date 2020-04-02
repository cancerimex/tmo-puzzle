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

    it('should be invalid if only one value is set', () => {
      const symbol = component.stockPickerForm.controls['symbol'];
      expect(symbol.valid).toBeFalsy();
    });

    it('should be valid if both values are set', () => {
      component.stockPickerForm.setValue({ symbol: 'AAPL', period: '1m' });
      expect(component.stockPickerForm.valid).toBeTruthy();
    });
    
    it('should call fetchQuote', () => {
      component.stockPickerForm.setValue({ symbol: 'AAPL', period: '1m' });
      component.fetchQuote();
      expect(priceQueryFacade.fetchQuote).toHaveBeenCalled();
      expect(priceQueryFacade.fetchQuote).toHaveBeenCalledWith('AAPL', '1m');
    });
  });

  


});
