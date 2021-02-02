import { ExpenseType } from '../../models/ExpenseType';
import { ActionType } from '../../util/types';
import { EXPENSE_TYPE_SAVE } from '../actionTypes';
import { saveExpenseTypeData } from './data';

const saveExpenseTypeAction = (data: Partial<ExpenseType>) => {
  return ({
    type: EXPENSE_TYPE_SAVE,
    data
  } as const);
}
export const saveExpenseType = (data: Partial<ExpenseType>) => async (dispatch: React.Dispatch<any>) => {
  const expenseType = await saveExpenseTypeData(data);
  return saveExpenseTypeAction(expenseType);
}

export type ExpenseTypeAction = 
  | ActionType<typeof saveExpenseType>
