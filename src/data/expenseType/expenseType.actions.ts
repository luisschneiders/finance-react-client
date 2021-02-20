import { ExpenseType, ExpenseTypeList } from '../../models/ExpenseType';
import { ActionType } from '../../util/types';
import {
  EXPENSE_TYPE_SAVE,
  EXPENSE_TYPE_SET
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
    type: EXPENSE_TYPE_SET,
    expenseType: {expensesType: data.expensesType, pagination: data.pagination}
  } as const);
}

export const setExpenseTypeList = (id: number, page: number, pageSize: number) => async () => {
  const data = await fetchExpenseTypedData(id, page, pageSize);
  return setExpenseTypeListAction(data);
}

export const saveExpenseType = (data: Partial<ExpenseType>) => async (dispatch: React.Dispatch<any>) => {
  const expenseType = await saveExpenseTypeData(data);
  return saveExpenseTypeAction(expenseType);
}

export type ExpenseTypeAction = 
  | ActionType<typeof saveExpenseType>
  | ActionType<typeof setExpenseTypeList>
