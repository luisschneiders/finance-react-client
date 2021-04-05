import { createSelector } from 'reselect';
import { AppState } from '../app/app.state';

const showModalBankData = (state: AppState) => state.modalReducer.isShowModalBank;
const showModalExpenseTypeData = (state: AppState) => state.modalReducer.isShowModalExpenseType;
const showModalExpensesSearchShowData = (state: AppState) => state.modalReducer.isShowModalExpensesSearch;
const showModalTransactionTypeData = (state: AppState) => state.modalReducer.isShowModalTransactionType;
const showModalTransactionsSearchShowData = (state: AppState) => state.modalReducer.isShowModalTransactionsSearch;
const showModalUserTypeData = (state: AppState) => state.modalReducer.isShowModalUserType;
const showModalVehicleData = (state: AppState) => state.modalReducer.isShowModalVehicle;

export const showModalBank = createSelector(
  showModalBankData,
  (isShowModalBank: boolean) => {
    return isShowModalBank;
  }
);

export const showModalExpenseType = createSelector(
  showModalExpenseTypeData,
  (isShowModalExpenseType: boolean) => {
    return isShowModalExpenseType;
  }
);

export const showModalTransactionType = createSelector(
  showModalTransactionTypeData,
  (isShowModalTransactionType: boolean) => {
    return isShowModalTransactionType;
  }
);

export const showModalUserType = createSelector(
  showModalUserTypeData,
  (isShowModalUserType: boolean) => {
    return isShowModalUserType;
  }
);

export const showModalVehicle = createSelector(
  showModalVehicleData,
  (isShowModalVehicle: boolean) => {
    return isShowModalVehicle;
  }
);

export const showModalExpensesSearch = createSelector(
  showModalExpensesSearchShowData,
  (isShowModalExpensesSearch: boolean) => {
    return isShowModalExpensesSearch;
  }
);

export const showModalTransactionsSearch = createSelector(
  showModalTransactionsSearchShowData,
  (isShowModalTransactionsSearch: boolean) => {
    return isShowModalTransactionsSearch;
  }
);
