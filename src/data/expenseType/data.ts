import {
  ExpenseType,
  ExpenseTypeList
} from '../../models/ExpenseType';

import {
  fetchExpenseTypeList,
  addExpenseType,
  updateExpenseType,
  fetchExpenseTypeById
} from '../api/ExpenseType';

export const fetchExpenseTypeData = async (id: number, page: number, pageSize: number) => {
  const response: any = await fetchExpenseTypeList(id, page, pageSize);
  return response as ExpenseTypeList;
}

export const fetchExpenseTypeByIdData = async (userId: number, expenseTypeId: number) => {
  const response: any = await fetchExpenseTypeById(userId, expenseTypeId);
  return response as ExpenseType;
}

export const addExpenseTypeData = async (data: Partial<ExpenseType>) => {
  const response: any = await addExpenseType(data);
  return response as ExpenseType;
}

export const updateExpenseTypeData = async (data: Partial<ExpenseType>) => {
  const response: any = await updateExpenseType(data);
  return response as ExpenseType;
}
