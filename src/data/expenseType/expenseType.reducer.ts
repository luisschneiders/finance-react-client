import {
  EXPENSE_TYPE_SAVE,
  EXPENSE_TYPE_LIST_SET,
  EXPENSE_TYPE_LIST_IS_FETCHING,
  EXPENSE_TYPE_IS_SAVING,
} from '../actionTypes';
import { ExpenseTypeAction } from './expenseType.actions';
import { ExpenseTypeState } from './expenseType.state';

export const expenseTypeReducer = (state: ExpenseTypeState, action: ExpenseTypeAction) : ExpenseTypeState => {
  switch (action.type) {
    case EXPENSE_TYPE_SAVE:
      // Add new expense in the list, 
      // then remove the last item from the array list
      // and check if page is smaller than pageCount, to prevent the slice
      const expensesType: any[] = (
        state.expenseTypeList.pagination.page < state.expenseTypeList.pagination.pageCount ?
        state.expenseTypeList.expensesType.slice(0, -1) : state.expenseTypeList.expensesType
      );

      return {
        ...state,
        expenseTypeList: {
          expensesType: [action.data, ...expensesType],
          pagination: {...state.expenseTypeList.pagination},
        }
      };
    case EXPENSE_TYPE_LIST_SET:
      return {
        ...state,
        expenseTypeList: {
          expensesType: [...state.expenseTypeList.expensesType, ...action.expenseTypeList.expensesType],
          pagination: {...state.expenseTypeList.pagination, ...action.expenseTypeList.pagination},
        }
      }
    case EXPENSE_TYPE_LIST_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      }
    case EXPENSE_TYPE_IS_SAVING:
      return {
        ...state,
        isSaving: action.isSaving
      }
  }
}
