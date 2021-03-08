import { ExpenseType, ExpenseTypeList } from '../../models/ExpenseType';
import { ActionType } from '../../util/types';
import {
  EXPENSE_TYPE_ADD,
  EXPENSE_TYPE_LIST_SET,
  EXPENSE_TYPE_LIST_IS_FETCHING,
  EXPENSE_TYPE_IS_SAVING,
  EXPENSE_TYPE_UPDATE,
  EXPENSE_TYPE_BY_ID_SET,
} from '../actionTypes';
import {
  fetchExpenseTypedData,
  addExpenseTypeData,
  updateExpenseTypeData,
  fetchExpenseTypeByIdData
} from './data';

const saveExpenseTypeAction = (data: ExpenseType) => {
  return ({
    type: EXPENSE_TYPE_ADD,
    payload: data
  } as const);
}

const updateExpenseTypeAction = (data: ExpenseType) => {
  return ({
    type: EXPENSE_TYPE_UPDATE,
    payload: data
  } as const);
}

const setExpenseTypeListAction = (data: ExpenseTypeList) => {
  return ({
    type: EXPENSE_TYPE_LIST_SET,
    payload: data
  } as const);
}

const setExpenseTypeByIdAction = (data: ExpenseType) => {
  return ({
    type: EXPENSE_TYPE_BY_ID_SET,
    payload: data
  } as const);
}

const isFetchingExpenseTypeListAction = (isFetching: boolean) => {
  return ({
    type: EXPENSE_TYPE_LIST_IS_FETCHING,
    payload: isFetching
  } as const);
}

const isSavingExpenseTypeAction = (isSaving: boolean) => {
  return ({
    type: EXPENSE_TYPE_IS_SAVING,
    payload: isSaving
  } as const);
}

export const isFetchingExpenseTypeList = (isFetching: boolean) => async () => {
  return isFetchingExpenseTypeListAction(isFetching);
}

export const isSavingExpenseType = (isSaving: boolean) => async () => {
  return isSavingExpenseTypeAction(isSaving);
}

export const setExpenseTypeList = (id: number, page: number, pageSize: number) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isFetchingExpenseTypeListAction(true));
  const data = await fetchExpenseTypedData(id, page, pageSize);
  dispatch(isFetchingExpenseTypeListAction(false));
  return setExpenseTypeListAction(data);
}

export const setExpenseTypeById = (userId: number, expenseTypeId: number) => async (dispatch: React.Dispatch<any>) => {

  const data = await fetchExpenseTypeByIdData(userId, expenseTypeId);

  return setExpenseTypeByIdAction(data);
}

export const addExpenseType = (data: Partial<ExpenseType>) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isSavingExpenseTypeAction(true));
  const expenseType = await addExpenseTypeData(data);
  dispatch(isSavingExpenseTypeAction(false));
  return saveExpenseTypeAction(expenseType);
}

export const updateExpenseType = (data: Partial<ExpenseType>) => async (dispatch: React.Dispatch<any>) => {
  const expenseType = await updateExpenseTypeData(data);
  return updateExpenseTypeAction(expenseType);
}

export type ExpenseTypeAction = 
  | ActionType<typeof addExpenseType>
  | ActionType<typeof updateExpenseType>
  | ActionType<typeof setExpenseTypeList>
  | ActionType<typeof setExpenseTypeById>
  | ActionType<typeof isFetchingExpenseTypeList>
  | ActionType<typeof isSavingExpenseType>
