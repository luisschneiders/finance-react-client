import { Period } from '../../models/Period';
import * as ROUTES from '../../constants/Routes';
import { Expenses } from '../../models/Expenses';
import { toast } from '../../components/toast/Toast';
import { StatusColor } from '../../enum/StatusColor';

export function fetchExpenses(id: number, period: Period, params: string) {
  return fetch(`${ROUTES.SERVER}/purchases-by-custom-search/id=${id}&from=${period.startDate}&to=${period.endDate}&expenseType=${params}`)
          .then(response => response.json())
          .then((result: any[]) => {
            const customList: Expenses[] = [];
            result.forEach((item: any) => {
              const list: Expenses = Object.assign({}, {
                expenseId: item.id,
                expenseDate: item.purchaseDate,
                expenseBank: item.purchaseBank,
                expenseTypeId: item.purchaseExpenseId,
                expenseAmount: item.purchaseAmount,
                expenseComments: item.purchaseComments,
                expenseTransactionTypeId: item.purchaseTransactionId,
                expenseInsertedBy: item.purchaseInsertedBy,
                expenseFlag: item.purchaseFlag,
                expenseCreatedAt: item.created_at,
                expenseUpdatedAt: item.updated_at,
                expenseAddress: item.purchaseAddress,
                expenseLatitude: item.purchaseLatitude,
                expenseLongitude: item.purchaseLongitude,

                // TODO: Get info from selectors
                expenseBankDescription: item.bankDescription,
                expenseTypeDescription: item.expenseTypeDescription,
              })
              customList.push(list);
            });
    
            return customList;
    
          },
          (error) => {
            toast(error.message, StatusColor.ERROR, 4000);
            return null;
          });
}
