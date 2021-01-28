import { TransactionsActions } from './transactions.actions';
import { TransactionsState } from './transactions.state';

export const transactionsReducer = (state: TransactionsState, action: TransactionsActions) : TransactionsState => {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      {
        return { ...state, ...action.data };
      }
  }
}
