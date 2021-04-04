import { Expenses } from '../../models/Expenses';
import { Period } from '../../models/Period';
import { ActionType } from '../../util/types';
import { EXPENSES_SET } from '../actionTypes';
import { fetchExpensesData } from './data';

const setExpensesAction = (data: Expenses) => {
  return ({
    type: EXPENSES_SET,
    payload: data
  } as const);
}

export const setExpenses = (id: number, period: Period, params: any) => async (dispatch: React.Dispatch<any>) => {
  const data = await fetchExpensesData(id, period, params);
  return setExpensesAction(data);
}

export type ExpensesActions =
  | ActionType<typeof setExpenses>
