import { Period } from '../../models/Period';
import { Transactions } from '../../models/Transactions';
import { ActionType } from '../../util/types';
import { fetchTransactionsData } from './data';

const setTransactionsAction = (data: Transactions) => {
  return ({
    type: 'SET_TRANSACTIONS',
    data
  } as const);
}

export const setTransactions = (id: number, period: Period, params: any) => async (dispatch: React.Dispatch<any>) => {
  const data = await fetchTransactionsData(id, period, params);
  return setTransactionsAction(data);
}

export type TransactionsActions =
  | ActionType<typeof setTransactions>
