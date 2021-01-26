import { createSelector } from 'reselect';
import { Expenses, ExpensesGroup } from '../../models/Expenses';
import { groupBy } from '../../util/groupBy';
import { AppState } from '../app/app.state';

const getExpensesData = (state: AppState) => state.expensesReducer.expenses;

export const getExpenses = createSelector(
  getExpensesData,
  (expenses: ExpensesGroup) => {
    return expenses;
  }
);

export const getExpensesByGroup = createSelector(
  getExpensesData,
  (data: any) => {
    if (!data) {
      return null;
    }

    // Because the original data is not grouped by 'expenseTypeDescription',
    // we need to do it here.
    const groups: Expenses[] = [];
    const customData: any = groupBy(data, 'expenseTypeDescription');

    let totalAmount: number = 0;

    Object.keys(customData).forEach((key: string) => {
      groups.push(customData[key]);
    });
    
    data.forEach((props: any) => {
      totalAmount += props.expenseAmount;
      return totalAmount;
    });

    // Assign the new array group to the ExpensesGroup
    const group: ExpensesGroup = Object.assign({}, {
      groups,
      totalAmount,
    });

    return group;
  }
);
