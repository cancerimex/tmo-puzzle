import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StocksComponent } from './stocks.component';
import { StocksDataAccessPriceQueryModule } from '@coding-challenge/stocks/data-access-price-query';
import { MatFormFieldModule, MatSelectModule, MatOptionModule, MatButtonModule, MatInputModule } from '@angular/material';
import { STOCKSAPPCONFIGTOKEN } from '@coding-challenge/stocks/data-access-app-config';
import { NxModule, DataPersistence } from '@nrwl/nx';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
