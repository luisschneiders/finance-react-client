import { EXPENSE_TYPE_SAVE, EXPENSE_TYPE_SET } from '../actionTypes';
import { ExpenseTypeAction } from './expenseType.actions';
import { ExpenseTypeState } from './expenseType.state';

export const expenseTypeReducer = (state: ExpenseTypeState, action: ExpenseTypeAction) : ExpenseTypeState => {
  switch (action.type) {
    case EXPENSE_TYPE_SAVE:
      return { ...state, ...action.data };
    case EXPENSE_TYPE_SET:
      return { ...state, expenseType: action.expenseType };
  }
}
