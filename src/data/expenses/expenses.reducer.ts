import { EXPENSES_SET } from "../actionTypes";
import { ExpensesActions } from "./expenses.actions";
import { ExpensesState } from "./expenses.state";

export const expensesReducer = (state: ExpensesState, action: ExpensesActions) : ExpensesState => {
  switch (action.type) {
    case EXPENSES_SET:
      return { ...state, ...action.data };
  }
}
