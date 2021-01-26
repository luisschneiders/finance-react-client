import { ExpensesActions } from "./expenses.actions";
import { ExpensesState } from "./expenses.state";

export const expensesReducer = (state: ExpensesState, action: ExpensesActions) : ExpensesState => {
  switch (action.type) {
    case 'SET_EXPENSES': {
      return { ...state, ...action.data };
    }
  }
}
