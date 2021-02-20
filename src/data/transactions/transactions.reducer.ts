import { TRANSACTIONS_SET } from '../actionTypes';
import { TransactionsActions } from './transactions.actions';
import { TransactionsState } from './transactions.state';

export const transactionsReducer = (state: TransactionsState, action: TransactionsActions) : TransactionsState => {
  switch (action.type) {
    case TRANSACTIONS_SET:
      return { ...state, ...action.data };
  }
}
