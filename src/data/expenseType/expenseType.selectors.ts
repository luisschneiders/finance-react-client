import { createSelector } from 'reselect';
import { ExpenseType, ExpenseTypeList } from '../../models/ExpenseType';
import { AppState } from '../app/app.state';

const getExpenseTypeData = (state: AppState) => state.expenseTypeReducer.expenseType;

export const getExpenseTypeList = createSelector(
  getExpenseTypeData,
  (expenseType: ExpenseTypeList) => {
    return expenseType;
  }
);
