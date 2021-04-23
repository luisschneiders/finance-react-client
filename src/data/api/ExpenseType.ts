import { ExpenseType, ExpenseTypeList, ExpenseTypeStatusActive } from '../../models/ExpenseType';
import * as ROUTES from '../../constants/Routes';
import { toast } from '../../components/toast/Toast';
import { StatusColor } from '../../enum/StatusColor';
import { PageListItem } from '../../enum/PageListItem';

export function fetchExpenseTypeList(id: number, page: number, pageSize: number) {

  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/get-all-expenses-type/id=${id}&page=${page}&pageSize=${pageSize}`)
          .then(response => {
            resStatus = response.status;
            return response.json()
          })
          .then((result: ExpenseTypeList) => {

            const expensesTypeMap: ExpenseType[] = [];
            result.expensesType.forEach((item: any) => {
              const expensesType: ExpenseType = {
                expenseTypeId: item.id,
                expenseTypeDescription: item.expenseTypeDescription,
                expenseTypeIsActive: item.expenseTypeIsActive === 0 ? false : true,
                expenseTypeInsertedBy: item.expenseTypeInsertedBy,
                expenseTypeCreatedAt: item.created_at,
                expenseTypeUpdatedAt: item.updated_at,
              };
              expensesTypeMap.push(expensesType);
            });

            const expenseTypeList: ExpenseTypeList = {
              expensesType: expensesTypeMap,
              pagination: result.pagination
            };

            return expenseTypeList;
          },
          (error) => {
            // Assign initial state as response
            const expenseTypeList: ExpenseTypeList = {
              expensesType: [],
              pagination: {page: 1, pageSize: PageListItem.ITEM_12, pageCount: 0, rowCount: 0}
            };

            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);

            return expenseTypeList;
          });
}

export function fetchExpenseTypeStatusActive(userId: number) {
  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/get-active-expenses-type/expenseTypeInsertedBy=${userId}`)
          .then(response => {
            resStatus = response.status;
            return response.json()
          })
          .then((result: ExpenseTypeStatusActive) => {

            const expensesTypeMap: ExpenseType[] = [];
            result.expensesType.forEach((item: any) => {
              const expensesType: ExpenseType = {
                expenseTypeId: item.id,
                expenseTypeDescription: item.expenseTypeDescription,
                expenseTypeIsActive: item.expenseTypeIsActive === 0 ? false : true,
                expenseTypeInsertedBy: item.expenseTypeInsertedBy,
                expenseTypeCreatedAt: item.created_at,
                expenseTypeUpdatedAt: item.updated_at,
              };
              expensesTypeMap.push(expensesType);
            });

            const expenseTypeList: ExpenseTypeStatusActive = {
              expensesType: expensesTypeMap,
            };

            return expenseTypeList;
          },
          (error) => {
            // Assign initial state as response
            const expenseTypeList: ExpenseTypeStatusActive = {
              expensesType: [],
            };

            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);

            return expenseTypeList;
          });
}

export function fetchExpenseTypeById(userId: number, expenseTypeId: number) {

  let resStatus: any = null; 
  
  return fetch(`${ROUTES.SERVER}/expense-type-id/expenseTypeInsertedBy=${userId}&id=${expenseTypeId}`)
          .then(response => {
            resStatus = response.status;
            return response.json();
          })
          .then((result: any) => {
            switch (resStatus) {
              case 200:
              case 201:
                const expenseType: ExpenseType = {
                  expenseTypeId: result.id,
                  expenseTypeDescription: result.expenseTypeDescription,
                  expenseTypeIsActive: result.expenseTypeIsActive,
                  expenseTypeInsertedBy: result.expenseTypeInsertedBy,
                  expenseTypeCreatedAt: result.created_at,
                  expenseTypeUpdatedAt: result.updated_at,
                };
                return expenseType;
              default:
                toast(`Code: ${resStatus} -> Unhandled`, StatusColor.ERROR, 4000);
                return false;
            }
          }).catch((error) => {
            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);
            return false;
          })
}

export function addExpenseType(data: Partial<ExpenseType>) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/expense-type-new/expenseTypeInsertedBy=${data.expenseTypeInsertedBy}`, requestOptions)
          .then(response => {
            resStatus = response.status;
            return response.json();
          })
          .then((result: any) => {
            switch (resStatus) {
              case 200:
              case 201:
                const expenseType: ExpenseType = {
                  expenseTypeId: result.expenseType.id,
                  expenseTypeDescription: result.expenseType.expenseTypeDescription,
                  expenseTypeIsActive: result.expenseType.expenseTypeIsActive,
                  expenseTypeInsertedBy: result.expenseType.expenseTypeInsertedBy,
                  expenseTypeCreatedAt: result.expenseType.created_at,
                  expenseTypeUpdatedAt: result.expenseType.updated_at,
                };
                toast(result.msg, StatusColor.SUCCESS, 4000);
                return expenseType;
              default:
                toast(`Code: ${resStatus} -> Unhandled`, StatusColor.ERROR, 4000);
                return false;
            }
          }).catch((error) => {
            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);
            return false;
          });
}

export function updateExpenseType(data: Partial<ExpenseType>) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/expense-type-id/expenseTypeInsertedBy=${data.expenseTypeInsertedBy}&id=${data.expenseTypeId}`, requestOptions)
  .then(response => {
    resStatus = response.status;
    return response.json();
  })
  .then((result: any) => {
    switch (resStatus) {
      case 200:
      case 201:
        const expenseType: ExpenseType = {
          expenseTypeId: result.expenseType.id,
          expenseTypeDescription: result.expenseType.expenseTypeDescription,
          expenseTypeIsActive: result.expenseType.expenseTypeIsActive,
          expenseTypeInsertedBy: result.expenseType.expenseTypeInsertedBy,
          expenseTypeCreatedAt: result.expenseType.created_at,
          expenseTypeUpdatedAt: result.expenseType.updated_at,
        };
        toast(result.msg, StatusColor.SUCCESS, 4000);
        return expenseType;
      default:
        toast(`Code: ${resStatus} -> Unhandled`, StatusColor.ERROR, 4000);
        return false;
    }
  }).catch((error) => {
    toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);
    return false;
  });

}
