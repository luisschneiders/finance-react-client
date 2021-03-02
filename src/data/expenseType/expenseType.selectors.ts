import { createSelector } from 'reselect';
import { ExpenseTypeList } from '../../models/ExpenseType';
import { AppState } from '../app/app.state';

const getExpenseTypeListData = (state: AppState) => state.expenseTypeReducer.expenseTypeList;
const isFetchingExpenseTypeListData = (state: AppState) => state.expenseTypeReducer.isFetching;
const isSavingExpenseTypeData = (state: AppState) => state.expenseTypeReducer.isSaving;

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
