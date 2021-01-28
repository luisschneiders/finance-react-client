import { createSelector } from 'reselect';
import { Transactions, TransactionsGroup } from '../../models/Transactions';
import { groupBy } from '../../util/groupBy';
import { AppState } from '../app/app.state';

const getTransactionsData = (state: AppState) => state.transactionsReducer.transactions;

export const getTransactions = createSelector(
  getTransactionsData,
  (transactions: Transactions) => {
    return transactions;
  }
);

export const getTransactionsByGroup = createSelector(
  getTransactionsData,
  (data: any) => {
    if (!data) {
      return null;
    }

    const groups: Transactions[] = [];
    const customData: any = groupBy(data, 'transactionTypeDescription');

    Object.keys(customData).forEach((key: string) => {
      key === null ? groups.push(customData['Purchases']) : groups.push(customData[key]);
    })

    const group: TransactionsGroup = Object.assign({}, {
      groups,
    });
    console.log('LFS - group: ', group);
    return group;
  }
);
