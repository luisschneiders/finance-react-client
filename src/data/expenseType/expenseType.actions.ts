import { ExpenseType, ExpenseTypeList } from '../../models/ExpenseType';
import { ActionType } from '../../util/types';
import {
  EXPENSE_TYPE_SAVE,
  EXPENSE_TYPE_LIST_SET,
  EXPENSE_TYPE_LIST_IS_FETCHING
} from '../actionTypes';
import {
  fetchExpenseTypedData,
  saveExpenseTypeData
} from './data';

const saveExpenseTypeAction = (data: Partial<ExpenseType>) => {
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

export const isFetchingExpenseTypeList = (isFetching: boolean) => async () => {
  return isFetchingExpenseTypeListAction(isFetching);
}

export const setExpenseTypeList = (id: number, page: number, pageSize: number) => async (dispatch: React.Dispatch<any>) => {
  const data = await fetchExpenseTypedData(id, page, pageSize);
  dispatch(isFetchingExpenseTypeListAction(false));
  return setExpenseTypeListAction(data);
}

export const saveExpenseType = (data: Partial<ExpenseType>) => async (dispatch: React.Dispatch<any>) => {
  const expenseType = await saveExpenseTypeData(data);
  return saveExpenseTypeAction(expenseType);
}

export type ExpenseTypeAction = 
  | ActionType<typeof saveExpenseType>
  | ActionType<typeof setExpenseTypeList>
  | ActionType<typeof isFetchingExpenseTypeList>
