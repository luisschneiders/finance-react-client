import { ExpenseType } from "../../models/ExpenseType";
import { Pagination } from "../../models/Pagination";

export interface ExpenseTypeListState {
  expenseTypeList: {
    expensesType: ExpenseType[];
    pagination: Pagination;
  };
  expenseTypeStatusActive: {
    expensesType: ExpenseType[];
  };
  expenseType: ExpenseType;
  isFetching: boolean;
  isSaving: boolean;
}
