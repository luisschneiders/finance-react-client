import { TransactionType, TransactionTypeList } from '../../models/TransactionType';
import { ActionType } from '../../util/types';
import {
  TRANSACTION_TYPE_ADD,
  TRANSACTION_TYPE_LIST_SET,
  TRANSACTION_TYPE_LIST_IS_FETCHING,
  TRANSACTION_TYPE_IS_SAVING,
  TRANSACTION_TYPE_UPDATE,
  TRANSACTION_TYPE_BY_ID_SET,
} from '../actionTypes';
import {
  fetchTransactionTypeData,
  addTransactionTypeData,
  updateTransactionTypeData,
  fetchTransactionTypeByIdData
} from './data';

const saveTransactionTypeAction = (data: TransactionType) => {
  return ({
    type: TRANSACTION_TYPE_ADD,
    payload: data
  } as const);
}

const updateTransactionTypeAction = (data: TransactionType) => {
  return ({
    type: TRANSACTION_TYPE_UPDATE,
    payload: data
  } as const);
}

const setTransactionTypeListAction = (data: TransactionTypeList) => {
  return ({
    type: TRANSACTION_TYPE_LIST_SET,
    payload: data
  } as const);
}

const setTransactionTypeByIdAction = (data: TransactionType) => {
  return ({
    type: TRANSACTION_TYPE_BY_ID_SET,
    payload: data
  } as const);
}

const isFetchingTransactionTypeListAction = (isFetching: boolean) => {
  return ({
    type: TRANSACTION_TYPE_LIST_IS_FETCHING,
    payload: isFetching
  } as const);
}

const isSavingTransactionTypeAction = (isSaving: boolean) => {
  return ({
    type: TRANSACTION_TYPE_IS_SAVING,
    payload: isSaving
  } as const);
}

export const isFetchingTransactionTypeList = (isFetching: boolean) => async () => {
  return isFetchingTransactionTypeListAction(isFetching);
}

export const isSavingTransactionType = (isSaving: boolean) => async () => {
  return isSavingTransactionTypeAction(isSaving);
}

export const setTransactionTypeList = (id: number, page: number, pageSize: number) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isFetchingTransactionTypeListAction(true));
  const data = await fetchTransactionTypeData(id, page, pageSize);
  dispatch(isFetchingTransactionTypeListAction(false));
  return setTransactionTypeListAction(data);
}

export const setTransactionTypeById = (userId: number, transactionTypeId: number) => async (dispatch: React.Dispatch<any>) => {

  const data = await fetchTransactionTypeByIdData(userId, transactionTypeId);

  return setTransactionTypeByIdAction(data);
}

export const addTransactionType = (data: Partial<TransactionType>) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isSavingTransactionTypeAction(true));
  const transactionType = await addTransactionTypeData(data);
  dispatch(isSavingTransactionTypeAction(false));
  return saveTransactionTypeAction(transactionType);
}

export const updateTransactionType = (data: Partial<TransactionType>) => async (dispatch: React.Dispatch<any>) => {
  const transactionType = await updateTransactionTypeData(data);
  return updateTransactionTypeAction(transactionType);
}

export type TransactionTypeAction = 
  | ActionType<typeof addTransactionType>
  | ActionType<typeof updateTransactionType>
  | ActionType<typeof setTransactionTypeList>
  | ActionType<typeof setTransactionTypeById>
  | ActionType<typeof isFetchingTransactionTypeList>
  | ActionType<typeof isSavingTransactionType>
