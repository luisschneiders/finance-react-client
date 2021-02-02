import { ExpenseType } from '../../models/ExpenseType';
import { saveExpenseType } from '../api/ExpenseType';

export const saveExpenseTypeData = async (data: Partial<ExpenseType>) => {
  const response: any = await saveExpenseType(data);
  const expenseType = response as ExpenseType;

  return expenseType;
}
