import { createSelector } from 'reselect';
import {
  TransactionType,
  TransactionTypeList,
  TransactionTypeStatusActive
} from '../../models/TransactionType';
import { AppState } from '../app/app.state';

const getTransactionTypeListData = (state: AppState) => state.transactionTypeReducer.transactionTypeList;
const getTransactionTypeStatusActiveData = (state: AppState) => state.transactionTypeReducer.transactionTypeStatusActive;
const getTransactionTypeData = (state: AppState) => state.transactionTypeReducer.transactionType;
const isFetchingTransactionTypeListData = (state: AppState) => state.transactionTypeReducer.isFetching;
const isSavingTransactionTypeData = (state: AppState) => state.transactionTypeReducer.isSaving;
const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
};

export const getTransactionTypeList = createSelector(
  getTransactionTypeListData,
  (transactionTypeList: TransactionTypeList) => {
    return transactionTypeList;
  }
);

export const getTransactionTypeStatusActive = createSelector(
  getTransactionTypeStatusActiveData,
  (transactionTypeStatusActive: TransactionTypeStatusActive) => {
    return transactionTypeStatusActive;
  }
);

export const isFetchingTransactionTypeList = createSelector(
  isFetchingTransactionTypeListData,
  (isFetching: boolean) => {
    return isFetching;
  }
);

export const isSavingTransactionType = createSelector(
  isSavingTransactionTypeData,
  (isSaving: boolean) => {
    return isSaving;
  }
);

export const getTransactionTypeFromList = createSelector(
  getTransactionTypeListData, getIdParam,
  (transactionTypeList: TransactionTypeList, id: number) => {
    if (transactionTypeList && transactionTypeList.transactionsType && transactionTypeList.transactionsType.length > 0) {
      return transactionTypeList.transactionsType.find((e: any) => e.transactionTypeId.toString() === id);
    }
  }  
);

export const getTransactionType = createSelector(
  getTransactionTypeData,
  (transactionsType: TransactionType) => {
    return transactionsType;
  }  
);
