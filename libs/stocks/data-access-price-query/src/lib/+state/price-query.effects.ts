import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  STOCKSAPPCONFIGTOKEN,
  StocksAppConfig
} from '@coding-challenge/stocks/data-access-app-config';
import { Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';
import {
  FetchPriceQuery,
  PriceQueryActionTypes,
  PriceQueryFetched,
  PriceQueryFetchError
} from './price-query.actions';
import { PriceQueryPartialState } from './price-query.reducer';
import { PriceQueryResponse } from './price-query.type';

@Injectable()
export class PriceQueryEffects {
  @Effect() loadPriceQuery$ = this.dataPersistence.fetch(
    PriceQueryActionTypes.FetchPriceQuery,
    {
      run: (action: FetchPriceQuery, state: PriceQueryPartialState) => {
        return this.httpClient
          .get(
            `${this.env.apiURL}/stock/${action.symbol}/max?token=${this.env.apiKey}`
          )
          .pipe(
            map((resp: any[]) =>
              new PriceQueryFetched(resp.filter(stock =>
                new Date(stock.date) >= new Date(action.periodFrom)
                && new Date(stock.date) <= new Date(action.periodTo)
              ) as PriceQueryResponse[] )
            )
          );
      },

      onError: (action: FetchPriceQuery, error) => {
        return new PriceQueryFetchError(error);
      }
    }
  );

  constructor(
    @Inject(STOCKSAPPCONFIGTOKEN) private env: StocksAppConfig,
    private httpClient: HttpClient,
    private dataPersistence: DataPersistence<PriceQueryPartialState>
  ) {}
}
