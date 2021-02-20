import { ExpenseType, ExpenseTypeList } from '../../models/ExpenseType';

import { fetchExpenseType, saveExpenseType } from '../api/ExpenseType';

export const fetchExpenseTypedData = async (id: number, page: number, pageSize: number) => {
  const response: any = await fetchExpenseType(id, page, pageSize);
  const expenseType = response as ExpenseTypeList;

  return expenseType;
}

export const saveExpenseTypeData = async (data: Partial<ExpenseType>) => {
  const response: any = await saveExpenseType(data);
  const expenseType = response as ExpenseType;

  return expenseType;
}
