import { Pagination } from './Pagination';

export interface ExpenseType {
  expenseTypeId: number;
  expenseTypeDescription: string;
  expenseTypeIsActive: boolean;
  expenseTypeInsertedBy: number;
  expenseTypeCreatedAt: string;
  expenseTypeUpdatedAt: string;
}

export interface ExpenseTypeList {
  expensesType: ExpenseType[];
  pagination: Pagination;
}
