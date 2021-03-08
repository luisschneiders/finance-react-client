import { ExpenseType } from "../../models/ExpenseType";
import { Pagination } from "../../models/Pagination";

export interface ExpenseTypeListState {
  expenseTypeList: {
    expensesType: ExpenseType[];
    pagination: Pagination;
  };
  expenseType: any;
  isFetching: boolean;
  isSaving: boolean;
}
