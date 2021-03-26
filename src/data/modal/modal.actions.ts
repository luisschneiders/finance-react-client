import { ActionType } from '../../util/types';
import {
  MODAL_BANK_SHOW_SET,
  MODAL_EXPENSE_TYPE_SHOW_SET,
  MODAL_TRANSACTION_TYPE_SHOW_SET,
  MODAL_USER_TYPE_SHOW_SET,
  MODAL_VEHICLE_SHOW_SET,
} from '../actionTypes';

const setModalBankShowAction = (isShowModalBank: boolean) => {
  return ({
    type: MODAL_BANK_SHOW_SET,
    payload: isShowModalBank
  } as const);
}

const setModalExpenseTypeShowAction = (isShowModalExpenseType: boolean) => {
  return ({
    type: MODAL_EXPENSE_TYPE_SHOW_SET,
    payload: isShowModalExpenseType
  } as const);
}

const setModalTransactionTypeShowAction = (isShowModalTransactionType: boolean) => {
  return ({
    type: MODAL_TRANSACTION_TYPE_SHOW_SET,
    payload: isShowModalTransactionType
  } as const);
}

const setModalUserTypeShowAction = (isShowModalUserType: boolean) => {
  return ({
    type: MODAL_USER_TYPE_SHOW_SET,
    payload: isShowModalUserType
  } as const);
}

const setModalVehicleShowAction = (isShowModalVehicle: boolean) => {
  return ({
    type: MODAL_VEHICLE_SHOW_SET,
    payload: isShowModalVehicle
  } as const);
}

export const setModalBankShow = (isShowModalBank: boolean) => async () => {
  return setModalBankShowAction(isShowModalBank);
}

export const setModalExpenseTypeShow = (isShowModalExpenseType: boolean) => async () => {
  return setModalExpenseTypeShowAction(isShowModalExpenseType);
}

export const setModalTransactionTypeShow = (isShowModalTransactionType: boolean) => async () => {
  return setModalTransactionTypeShowAction(isShowModalTransactionType);
}

export const setModalUserTypeShow = (isShowModalUserType: boolean) => async () => {
  return setModalUserTypeShowAction(isShowModalUserType);
}

export const setModalVehicleShow = (isShowModalVehicle: boolean) => async () => {
  return setModalVehicleShowAction(isShowModalVehicle);
}

export type ModalAction = 
  | ActionType<typeof setModalBankShow>
  | ActionType<typeof setModalExpenseTypeShow>
  | ActionType<typeof setModalTransactionTypeShow>
  | ActionType<typeof setModalUserTypeShow>
  | ActionType<typeof setModalVehicleShow>
