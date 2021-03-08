import { createSelector } from 'reselect';
import { ExpenseType, ExpenseTypeList } from '../../models/ExpenseType';
import { AppState } from '../app/app.state';

const getExpenseTypeListData = (state: AppState) => state.expenseTypeReducer.expenseTypeList;
const getExpenseTypeData = (state: AppState) => state.expenseTypeReducer.expenseType;
const isFetchingExpenseTypeListData = (state: AppState) => state.expenseTypeReducer.isFetching;
const isSavingExpenseTypeData = (state: AppState) => state.expenseTypeReducer.isSaving;
const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
};

export const getExpenseTypeList = createSelector(
  getExpenseTypeListData,
  (expenseTypeList: ExpenseTypeList) => {
    return expenseTypeList;
  }
);

export const isFetchingExpenseTypeList = createSelector(
  isFetchingExpenseTypeListData,
  (isFetching: boolean) => {
    return isFetching;
  }
);

export const isSavingExpenseType = createSelector(
  isSavingExpenseTypeData,
  (isSaving: boolean) => {
    return isSaving;
  }
);

export const getExpenseTypeFromList = createSelector(
  getExpenseTypeListData, getIdParam,
  (expenseTypeList: ExpenseTypeList, id: number) => {
    if (expenseTypeList && expenseTypeList.expensesType && expenseTypeList.expensesType.length > 0) {
      return expenseTypeList.expensesType.find((e: any) => e.expenseTypeId.toString() === id);
    }
  }  
);

export const getExpenseType = createSelector(
  getExpenseTypeData,
  (expensesType: ExpenseType) => {
    return expensesType;
  }  
);
