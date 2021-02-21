import { ExpenseType, ExpenseTypeList } from '../../models/ExpenseType';

import { fetchExpenseTypeList, saveExpenseType } from '../api/ExpenseType';

export const fetchExpenseTypedData = async (id: number, page: number, pageSize: number) => {
  const response: any = await fetchExpenseTypeList(id, page, pageSize);
  const expenseTypeList = response as ExpenseTypeList;

  return expenseTypeList;
}

export const saveExpenseTypeData = async (data: Partial<ExpenseType>) => {
  const response: any = await saveExpenseType(data);
  const expenseType = response as ExpenseType;

  return expenseType;
}
