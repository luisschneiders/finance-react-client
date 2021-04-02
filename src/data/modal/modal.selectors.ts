import { createSelector } from 'reselect';
import { AppState } from '../app/app.state';

const showModalBankData = (state: AppState) => state.modalReducer.isShowModalBank;
const showModalExpensesSearchShowData = (state: AppState) => state.modalReducer.isShowModalExpensesSearch;
const showModalExpenseTypeData = (state: AppState) => state.modalReducer.isShowModalExpenseType;
const showModalTransactionTypeData = (state: AppState) => state.modalReducer.isShowModalTransactionType;
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
