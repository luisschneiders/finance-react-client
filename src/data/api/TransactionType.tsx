import { TransactionType, TransactionTypeList, TransactionTypeStatusActive } from '../../models/TransactionType';
import * as ROUTES from '../../constants/Routes';
import { toast } from '../../components/toast/Toast';
import { StatusColor } from '../../enum/StatusColor';
import { PageSize } from '../../enum/PageSize';

export function fetchTransactionTypeList(id: number, page: number, pageSize: number) {

  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/get-all-transactions-type/id=${id}&page=${page}&pageSize=${pageSize}`)
          .then(response => {
            resStatus = response.status;
            return response.json()
          })
          .then((result: TransactionTypeList) => {

            const transactionsTypeMap: TransactionType[] = [];
            result.transactionsType.forEach((item: any) => {
              const transactionsType: TransactionType = {
                transactionTypeId: item.id,
                transactionTypeDescription: item.transactionTypeDescription,
                transactionTypeAction: item.transactionTypeAction,
                transactionTypeIsActive: item.transactionTypeIsActive === 0 ? false : true,
                transactionTypeInsertedBy: item.transactionTypeInsertedBy,
                transactionTypeCreatedAt: item.created_at,
                transactionTypeUpdatedAt: item.updated_at,
              };
              transactionsTypeMap.push(transactionsType);
            });

            const transactionTypeList: TransactionTypeList = {
              transactionsType: transactionsTypeMap,
              pagination: result.pagination
            };

            return transactionTypeList;
          },
          (error) => {
            // Assign initial state as response
            const transactionTypeList: TransactionTypeList = {
              transactionsType: [],
              pagination: {page: 1, pageSize: PageSize.S_12, pageCount: 0, rowCount: 0}
            };

            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);

            return transactionTypeList;
          });
}

export function fetchTransactionTypeStatusActive(userId: number) {
  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/get-active-transactions-type/transactionTypeInsertedBy=${userId}`)
          .then(response => {
            resStatus = response.status;
            return response.json()
          })
          .then((result: TransactionTypeStatusActive) => {

            const transactionsTypeMap: TransactionType[] = [];
            result.transactionsType.forEach((item: any) => {
              const transactionsType: TransactionType = {
                transactionTypeId: item.id,
                transactionTypeDescription: item.transactionTypeDescription,
                transactionTypeAction: item.transactionTypeAction,
                transactionTypeIsActive: item.transactionTypeIsActive === 0 ? false : true,
                transactionTypeInsertedBy: item.transactionTypeInsertedBy,
                transactionTypeCreatedAt: item.created_at,
                transactionTypeUpdatedAt: item.updated_at,
              };
              transactionsTypeMap.push(transactionsType);
            });

            const transactionTypeList: TransactionTypeStatusActive = {
              transactionsType: transactionsTypeMap,
            };

            return transactionTypeList;
          },
          (error) => {
            // Assign initial state as response
            const transactionTypeList: TransactionTypeStatusActive = {
              transactionsType: [],
            };

            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);

            return transactionTypeList;
          });
}

export function fetchTransactionTypeById(userId: number, transactionTypeId: number) {

  let resStatus: any = null; 
  
  return fetch(`${ROUTES.SERVER}/transaction-type-id/transactionTypeInsertedBy=${userId}&id=${transactionTypeId}`)
          .then(response => {
            resStatus = response.status;
            return response.json();
          })
          .then((result: any) => {
            switch (resStatus) {
              case 200:
              case 201:
                const transactionType: TransactionType = {
                  transactionTypeId: result.id,
                  transactionTypeDescription: result.transactionTypeDescription,
                  transactionTypeAction: result.transactionTypeAction,
                  transactionTypeIsActive: result.transactionTypeIsActive,
                  transactionTypeInsertedBy: result.transactionTypeInsertedBy,
                  transactionTypeCreatedAt: result.created_at,
                  transactionTypeUpdatedAt: result.updated_at,
                };
                return transactionType;
              default:
                toast(`Code: ${resStatus} -> Unhandled`, StatusColor.ERROR, 4000);
                return false;
            }
          }).catch((error) => {
            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);
            return false;
          })
}

export function addTransactionType(data: Partial<TransactionType>) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/transaction-type-new/transactionTypeInsertedBy=${data.transactionTypeInsertedBy}`, requestOptions)
          .then(response => {
            resStatus = response.status;
            return response.json();
          })
          .then((result: any) => {
            switch (resStatus) {
              case 200:
              case 201:
                const transactionType: TransactionType = {
                  transactionTypeId: result.transactionType.id,
                  transactionTypeDescription: result.transactionType.transactionTypeDescription,
                  transactionTypeAction: result.transactionType.transactionTypeAction,
                  transactionTypeIsActive: result.transactionType.transactionTypeIsActive,
                  transactionTypeInsertedBy: result.transactionType.transactionTypeInsertedBy,
                  transactionTypeCreatedAt: result.transactionType.created_at,
                  transactionTypeUpdatedAt: result.transactionType.updated_at,
                };
                toast(result.msg, StatusColor.SUCCESS, 4000);
                return transactionType;
              default:
                toast(`Code: ${resStatus} -> Unhandled`, StatusColor.ERROR, 4000);
                return false;
            }
          }).catch((error) => {
            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);
            return false;
          });
}

export function updateTransactionType(data: Partial<TransactionType>) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/transaction-type-id/transactionTypeInsertedBy=${data.transactionTypeInsertedBy}&id=${data.transactionTypeId}`, requestOptions)
  .then(response => {
    resStatus = response.status;
    return response.json();
  })
  .then((result: any) => {
    switch (resStatus) {
      case 200:
      case 201:
        const transactionType: TransactionType = {
          transactionTypeId: result.transactionType.id,
          transactionTypeDescription: result.transactionType.transactionTypeDescription,
          transactionTypeAction: result.transactionType.transactionTypeAction,
          transactionTypeIsActive: result.transactionType.transactionTypeIsActive,
          transactionTypeInsertedBy: result.transactionType.transactionTypeInsertedBy,
          transactionTypeCreatedAt: result.transactionType.created_at,
          transactionTypeUpdatedAt: result.transactionType.updated_at,
        };
        toast(result.msg, StatusColor.SUCCESS, 4000);
        return transactionType;
      default:
        toast(`Code: ${resStatus} -> Unhandled`, StatusColor.ERROR, 4000);
        return false;
    }
  }).catch((error) => {
    toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);
    return false;
  });

}
