import { ExpenseType, ExpenseTypeList } from '../../models/ExpenseType';
import { ActionType } from '../../util/types';
import {
  EXPENSE_TYPE_SAVE,
  EXPENSE_TYPE_LIST_SET,
  EXPENSE_TYPE_LIST_IS_FETCHING,
  EXPENSE_TYPE_IS_SAVING,
} from '../actionTypes';
import {
  fetchExpenseTypedData,
  saveExpenseTypeData
} from './data';

const saveExpenseTypeAction = (data: ExpenseType) => {
  return ({
    type: EXPENSE_TYPE_SAVE,
    data
  } as const);
}

const setExpenseTypeListAction = (data: ExpenseTypeList) => {
  return ({
    type: EXPENSE_TYPE_LIST_SET,
    expenseTypeList: data
  } as const);
}

const isFetchingExpenseTypeListAction = (isFetching: boolean) => {
  return ({
    type: EXPENSE_TYPE_LIST_IS_FETCHING,
    isFetching
  } as const);
}

const isSavingExpenseTypeAction = (isSaving: boolean) => {
  return ({
    type: EXPENSE_TYPE_IS_SAVING,
    isSaving
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

export const saveExpenseType = (data: Partial<ExpenseType>) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isSavingExpenseTypeAction(true));
  const expenseType = await saveExpenseTypeData(data);
  dispatch(isSavingExpenseTypeAction(false));
  return saveExpenseTypeAction(expenseType);
}

export type ExpenseTypeAction = 
  | ActionType<typeof saveExpenseType>
  | ActionType<typeof setExpenseTypeList>
  | ActionType<typeof isFetchingExpenseTypeList>
  | ActionType<typeof isSavingExpenseType>
