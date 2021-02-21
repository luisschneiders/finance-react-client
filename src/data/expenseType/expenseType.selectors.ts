import { createSelector } from 'reselect';
import { ExpenseTypeList } from '../../models/ExpenseType';
import { AppState } from '../app/app.state';

const getExpenseTypeListData = (state: AppState) => state.expenseTypeReducer.expenseTypeList;

export const getExpenseTypeList = createSelector(
  getExpenseTypeListData,
  (expenseTypeList: ExpenseTypeList) => {
    return expenseTypeList;
  }
);
