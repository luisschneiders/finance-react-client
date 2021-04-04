import {
  EXPENSE_TYPE_ADD,
  EXPENSE_TYPE_LIST_SET,
  EXPENSE_TYPE_LIST_IS_FETCHING,
  EXPENSE_TYPE_IS_SAVING,
  EXPENSE_TYPE_UPDATE,
  EXPENSE_TYPE_BY_ID_SET,
  EXPENSE_TYPE_STATUS_ACTIVE_SET,
} from '../actionTypes';
import { ExpenseTypeAction } from './expenseType.actions';
import { ExpenseTypeListState } from './expenseType.state';

export const expenseTypeReducer = (state: ExpenseTypeListState, action: ExpenseTypeAction) : ExpenseTypeListState => {
  switch (action.type) {
    case EXPENSE_TYPE_ADD:
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
          expensesType: [action.payload, ...expensesType],
          pagination: {...state.expenseTypeList.pagination},
        }
      };
    case EXPENSE_TYPE_UPDATE:
      return {
        ...state
      };
    case EXPENSE_TYPE_LIST_SET:
      return {
        ...state,
        expenseTypeList: {
          expensesType: [...state.expenseTypeList.expensesType, ...action.payload.expensesType],
          pagination: {...state.expenseTypeList.pagination, ...action.payload.pagination},
        }
      }
    case EXPENSE_TYPE_STATUS_ACTIVE_SET:
      return {
        ...state,
        expenseTypeStatusActive: {
          expensesType: [...state.expenseTypeList.expensesType, ...action.payload.expensesType],
        }
      }
    case EXPENSE_TYPE_BY_ID_SET:
      return {
        ...state,
        expenseType: action.payload
      }
    case EXPENSE_TYPE_LIST_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case EXPENSE_TYPE_IS_SAVING:
      return {
        ...state,
        isSaving: action.payload
      }
  }
}
