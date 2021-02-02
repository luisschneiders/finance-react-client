import { ExpenseType } from '../../models/ExpenseType';

export function saveExpenseType(data: Partial<ExpenseType>) {
  console.log('LFS - data: ', data);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  let resStatus: any = null;

  return 1;
}