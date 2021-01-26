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
                expenseBankDescription: item.bankDescription,
                expenseTypeDescription: item.expenseTypeDescription,
                expenseAddress: item.purchaseAddress,
                expenseAmount: item.purchaseAmount,
                expenseComments: item.purchaseComments,
                expenseDate: item.purchaseDate,
                expenseTypeId: item.purchaseExpenseId,
                expenseLatitude: item.purchaseLatitude,
                expenseLongitude: item.purchaseLongitude,
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
