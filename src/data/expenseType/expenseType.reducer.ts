import { EXPENSE_TYPE_SAVE, EXPENSE_TYPE_LIST_SET } from '../actionTypes';
import { ExpenseTypeAction } from './expenseType.actions';
import { ExpenseTypeState } from './expenseType.state';

export const expenseTypeReducer = (state: ExpenseTypeState, action: ExpenseTypeAction) : ExpenseTypeState => {
  switch (action.type) {
    case EXPENSE_TYPE_SAVE:
      return { ...state, ...action.data };
    case EXPENSE_TYPE_LIST_SET:
      return {
        ...state,
        expenseTypeList: {
          expensesType: [...state.expenseTypeList.expensesType, ...action.expenseTypeList.expensesType],
          pagination: {...state.expenseTypeList.pagination, ...action.expenseTypeList.pagination}
        }
      }
  }
}
