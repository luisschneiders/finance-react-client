import { Expenses } from '../../models/Expenses';
import { Period } from '../../models/Period';
import { fetchExpenses } from '../api/Expenses';

export const fetchExpensesData = async (id: number, period: Period, params: string) => {
  const response: any = await fetchExpenses(id, period, params);
  const expenses = response as Expenses;
  const data:  any = {
    expenses
  };

  return data;
}
