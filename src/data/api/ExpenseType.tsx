import { ExpenseType, ExpenseTypeList } from '../../models/ExpenseType';
import * as ROUTES from '../../constants/Routes';
import { toast } from '../../components/toast/Toast';
import { StatusColor } from '../../enum/StatusColor';

export function fetchExpenseTypeList(id: number, page: number, pageSize: number) {
  return fetch(`${ROUTES.SERVER}/get-all-expenses-type/id=${id}&page=${page}&pageSize=${pageSize}`)
          .then(response => response.json())
          .then((result: ExpenseTypeList) => {
            return result;
          },
          (error) => {
            toast(error.message, StatusColor.ERROR, 4000);
            return null;
          });
}

export function saveExpenseType(data: Partial<ExpenseType>) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  let resStatus: any = null;

  return 1;
}
