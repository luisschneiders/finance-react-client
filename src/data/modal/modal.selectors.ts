import { createSelector } from 'reselect';
import { AppState } from '../app/app.state';

const showModalBankData = (state: AppState) => state.modalReducer.isShowModalBank;
const showModalExpenseTypeData = (state: AppState) => state.modalReducer.isShowModalExpenseType;
const showModalTransactionTypeData = (state: AppState) => state.modalReducer.isShowModalTransactionType;
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

export const showModalVehicle = createSelector(
  showModalVehicleData,
  (isShowModalVehicle: boolean) => {
    return isShowModalVehicle;
  }
);
