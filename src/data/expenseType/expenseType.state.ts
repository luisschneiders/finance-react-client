import { ExpenseType } from "../../models/ExpenseType";
import { Pagination } from "../../models/Pagination";

export interface ExpenseTypeState {
  expenseTypeList: {
    expensesType: ExpenseType[];
    pagination: Pagination;
  };
  isFetching: boolean;
  isSaving: boolean;
}
