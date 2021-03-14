import {
  TRANSACTION_TYPE_ADD,
  TRANSACTION_TYPE_LIST_SET,
  TRANSACTION_TYPE_LIST_IS_FETCHING,
  TRANSACTION_TYPE_IS_SAVING,
  TRANSACTION_TYPE_UPDATE,
  TRANSACTION_TYPE_BY_ID_SET,
} from '../actionTypes';
import { TransactionTypeAction } from './transactionType.actions';
import { TransactionTypeListState } from './transactionType.state';

export const transactionTypeReducer = (state: TransactionTypeListState, action: TransactionTypeAction) : TransactionTypeListState => {
  switch (action.type) {
    case TRANSACTION_TYPE_ADD:
      // Add new Transaction in the list, 
      // then remove the last item from the array list
      // and check if page is smaller than pageCount, to prevent the slice
      const transactionsType: any[] = (
        state.transactionTypeList.pagination.page < state.transactionTypeList.pagination.pageCount ?
        state.transactionTypeList.transactionsType.slice(0, -1) : state.transactionTypeList.transactionsType
      );

      return {
        ...state,
        transactionTypeList: {
          transactionsType: [action.payload, ...transactionsType],
          pagination: {...state.transactionTypeList.pagination},
        }
      };
    case TRANSACTION_TYPE_UPDATE:
      return {
        ...state
      };
    case TRANSACTION_TYPE_LIST_SET:
      return {
        ...state,
        transactionTypeList: {
          transactionsType: [...state.transactionTypeList.transactionsType, ...action.payload.transactionsType],
          pagination: {...state.transactionTypeList.pagination, ...action.payload.pagination},
        }
      }
    case TRANSACTION_TYPE_BY_ID_SET:
      return {
        ...state,
        transactionType: action.payload
      }
    case TRANSACTION_TYPE_LIST_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case TRANSACTION_TYPE_IS_SAVING:
      return {
        ...state,
        isSaving: action.payload
      }
  }
}
