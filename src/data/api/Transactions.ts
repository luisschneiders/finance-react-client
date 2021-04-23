import { Period } from '../../models/Period';
import * as ROUTES from '../../constants/Routes';
import { Transactions } from '../../models/Transactions';
import { toast } from '../../components/toast/Toast';
import { StatusColor } from '../../enum/StatusColor';

export function fetchTransactions(id: number, period: Period, params: string) {
  return fetch(`${ROUTES.SERVER}/transactions-by-custom-search/id=${id}&from=${period.startDate}&to=${period.endDate}&transactionType=${params}`)
          .then(response => response.json())
          .then((result: any[]) => {
            const customList: Transactions[] = [];
            result.forEach((item: any) => {
              const list: Transactions = Object.assign({}, {
                transactionId: item.id,
                transactionLink: item.transactionLink,
                transactionDate: item.transactionDate,
                transactionFromBank: item.transactionFromBank,
                transactionToBank: item.transactionToBank,
                transactionTypeId: item.transactionType,
                transactionAction: item.transactionAction,
                transactionLabel: item.transactionLabel,
                transactionAmount: item.transactionAmount,
                transactionComments: item.transactionComments,
                transactionInsertedBy: item.transactionInsertedBy,
                transactionFlag: item.transactionFlag,
                transactionCreatedAt: item.created_at,
                transactionUpdatedAt: item.updated_at,

                // TODO: Get info from selectors
                transactionBankDescription: item.bankDescription,
                /**
                 * For purchases the transactionType is 0, so we need to set description here.
                 */
                transactionTypeDescription: item.transactionType === 0 ? 'Purchases' : item.transactionTypeDescription,
              });
              customList.push(list);
            });

            return customList;
          },
          (error) => {
            toast(error.message, StatusColor.ERROR, 4000);
            return null;
          })
}
