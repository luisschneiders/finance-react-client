import {
  Bank,
  BankList,
  BankStatusActive
} from '../../models/Bank';
import { ActionType } from '../../util/types';
import {
  BANK_ADD,
  BANK_LIST_SET,
  BANK_LIST_IS_FETCHING,
  BANK_IS_SAVING,
  BANK_UPDATE,
  BANK_BY_ID_SET,
  BANK_MODAL_SHOW,
  BANK_STATUS_ACTIVE_SET,
} from '../actionTypes';
import {
  fetchBankData,
  addBankData,
  updateBankData,
  fetchBankByIdData,
  fetchBankStatusActiveData
} from './data';

const saveBankAction = (data: Bank) => {
  return ({
    type: BANK_ADD,
    payload: data
  } as const);
}

const updateBankAction = (data: Bank) => {
  return ({
    type: BANK_UPDATE,
    payload: data
  } as const);
}

const setBankListAction = (data: BankList) => {
  return ({
    type: BANK_LIST_SET,
    payload: data
  } as const);
}

const setBankByStatusActiveAction = (data: BankStatusActive) => {
  return ({
    type: BANK_STATUS_ACTIVE_SET,
    payload: data
  } as const);
}

const setBankByIdAction = (data: Bank) => {
  return ({
    type: BANK_BY_ID_SET,
    payload: data
  } as const);
}

const isFetchingBankListAction = (isFetching: boolean) => {
  return ({
    type: BANK_LIST_IS_FETCHING,
    payload: isFetching
  } as const);
}

const isSavingBankAction = (isSaving: boolean) => {
  return ({
    type: BANK_IS_SAVING,
    payload: isSaving
  } as const);
}

const setBankModalShowAction = (showBankModal: boolean) => {
  return ({
    type: BANK_MODAL_SHOW,
    payload: showBankModal
  } as const);
}

export const isFetchingBankList = (isFetching: boolean) => async () => {
  return isFetchingBankListAction(isFetching);
}

export const isSavingBank = (isSaving: boolean) => async () => {
  return isSavingBankAction(isSaving);
}

export const setBankModalShow = (showBankModal: boolean) => async () => {
  return setBankModalShowAction(showBankModal);
}

export const setBankList = (id: number, page: number, pageSize: number) => async (dispatch: React.Dispatch<any>) => {
  // dispatch(isFetchingBankListAction(true));
  const data = await fetchBankData(id, page, pageSize);
  // dispatch(isFetchingBankListAction(false));
  return setBankListAction(data);
}

export const setBankByStatusActive = (userId: number) => async (dispatch: React.Dispatch<any>) => {

  dispatch(isFetchingBankListAction(true));
  const data = await fetchBankStatusActiveData(userId);
  dispatch(isFetchingBankListAction(false));

  return setBankByStatusActiveAction(data);
}

export const setBankById = (userId: number, bankId: number) => async (dispatch: React.Dispatch<any>) => {

  const data = await fetchBankByIdData(userId, bankId);

  return setBankByIdAction(data);
}

export const addBank = (data: Partial<Bank>) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isSavingBankAction(true));
  const bank = await addBankData(data);
  dispatch(isSavingBankAction(false));
  return saveBankAction(bank);
}

export const updateBank = (data: Partial<Bank>) => async (dispatch: React.Dispatch<any>) => {
  const bank = await updateBankData(data);
  return updateBankAction(bank);
}

export type BankAction = 
  | ActionType<typeof addBank>
  | ActionType<typeof updateBank>
  | ActionType<typeof setBankList>
  | ActionType<typeof setBankByStatusActive>
  | ActionType<typeof setBankById>
  | ActionType<typeof setBankModalShow>
  | ActionType<typeof isFetchingBankList>
  | ActionType<typeof isSavingBank>
