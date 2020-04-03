import { priceQueryReducer, initialState, PriceQueryState } from './price-query.reducer';
import * as priceQueryActions from './price-query.actions';

describe('priceQueryReducer', () => {
  it('should return the default state', () => {
    const action = {} as any;
    const state = priceQueryReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should add selectedSymbol to state', () => {
    const TEST_INITIAL_STATE: PriceQueryState = { 
      ids: [],
      entities: {},
      selectedSymbol: ''
    };
    const action = new priceQueryActions.SelectSymbol('AAPL');
    const state = priceQueryReducer(TEST_INITIAL_STATE, action);

    expect(state.selectedSymbol).toEqual('AAPL');
  });

});