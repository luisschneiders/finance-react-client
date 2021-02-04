import { ExpenseType } from '../../models/ExpenseType';
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

const setExpenseTypeAction = (data: ExpenseType) => {
  return ({
    type: EXPENSE_TYPE_SET,
    data
  } as const);
}

export const setExpenseType = (id: number) => async () => {
  const data = await fetchExpenseTypedData(id);
  return setExpenseTypeAction(data);
}

export const saveExpenseType = (data: Partial<ExpenseType>) => async (dispatch: React.Dispatch<any>) => {
  const expenseType = await saveExpenseTypeData(data);
  return saveExpenseTypeAction(expenseType);
}

export type ExpenseTypeAction = 
  | ActionType<typeof saveExpenseType>
