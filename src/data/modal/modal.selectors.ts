import { createSelector } from 'reselect';
import { AppState } from '../app/app.state';

const showModalBankData = (state: AppState) => state.modalReducer.isShowModalBank;
const showModalVehicleData = (state: AppState) => state.modalReducer.isShowModalVehicle;
const showModalExpenseTypeData = (state: AppState) => state.modalReducer.isShowModalExpenseType;

export const showModalBank = createSelector(
  showModalBankData,
  (isShowModalBank: boolean) => {
    return isShowModalBank;
  }
);

export const showModalVehicle = createSelector(
  showModalVehicleData,
  (isShowModalVehicle: boolean) => {
    return isShowModalVehicle;
  }
);

export const showModalExpenseType = createSelector(
  showModalExpenseTypeData,
  (isShowModalExpenseType: boolean) => {
    return isShowModalExpenseType;
  }
);
