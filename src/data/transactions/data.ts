import { Period } from '../../models/Period';
import { Transactions } from '../../models/Transactions';
import { fetchTransactions } from '../api/Transactions';

export const fetchTransactionsData = async (id: number, period: Period, params: string) => {
  const response: any = await fetchTransactions(id, period, params);
  const transactions = response as Transactions;
  const data: any = {
    transactions
  };

  return data;
}
