import { ExpenseType, ExpenseTypeList } from '../../models/ExpenseType';

import { fetchExpenseTypeList, addExpenseType, updateExpenseType } from '../api/ExpenseType';

export const fetchExpenseTypedData = async (id: number, page: number, pageSize: number) => {
  const response: any = await fetchExpenseTypeList(id, page, pageSize);
  return response as ExpenseTypeList;
}

export const addExpenseTypeData = async (data: Partial<ExpenseType>) => {
  const response: any = await addExpenseType(data);
  return response as ExpenseType;
}

export const updateExpenseTypeData = async (data: Partial<ExpenseType>) => {
  const response: any = await updateExpenseType(data);
  return response as ExpenseType;
}
