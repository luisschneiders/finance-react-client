import { ExpenseType } from '../../models/ExpenseType';
import { fetchExpenseType, saveExpenseType } from '../api/ExpenseType';

export const fetchExpenseTypedData = async (id: number) => {
  const response: any = await fetchExpenseType(id);
  const expenseType = response as ExpenseType;

  return expenseType;
}

export const saveExpenseTypeData = async (data: Partial<ExpenseType>) => {
  const response: any = await saveExpenseType(data);
  const expenseType = response as ExpenseType;

  return expenseType;
}
