import { Bank, BankList, BankStatusActive } from '../../models/Bank';
import * as ROUTES from '../../constants/Routes';
import { toast } from '../../components/toast/Toast';
import { StatusColor } from '../../enum/StatusColor';
import { PageListItem } from '../../enum/PageListItem';

export function fetchBankList(id: number, page: number, pageSize: number) {

  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/get-all-banks/id=${id}&page=${page}&pageSize=${pageSize}`)
          .then(response => {
            resStatus = response.status;
            return response.json()
          })
          .then((result: BankList) => {

            const banksMap: Bank[] = [];
            result.banks.forEach((item: any) => {
              const bank: Bank = {
                bankId: item.id,
                bankDescription: item.bankDescription,
                bankAccount: item.bankAccount,
                bankInitialBalance: item.bankInitialBalance,
                bankCurrentBalance: item.bankCurrentBalance,
                bankIsActive: item.bankIsActive === 0 ? false : true,
                bankInsertedBy: item.bankInsertedBy,
                bankCreatedAt: item.created_at,
                bankUpdatedAt: item.updated_at,
              };
              banksMap.push(bank);
            });

            const bankList: BankList = {
              banks: banksMap,
              pagination: result.pagination
            };

            return bankList;
          },
          (error) => {
            // Assign initial state as response
            const bankList: BankList = {
              banks: [],
              pagination: {page: 1, pageSize: PageListItem.ITEM_12, pageCount: 0, rowCount: 0}
            };

            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);

            return bankList;
          });
}

export function fetchBankStatusActive(userId: number) {
  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/get-active-banks/bankInsertedBy=${userId}`)
          .then(response => {
            resStatus = response.status;
            return response.json()
          })
          .then((result: BankStatusActive) => {

            const banksMap: Bank[] = [];
            result.banks.forEach((item: any) => {
              const bank: Bank = {
                bankId: item.id,
                bankDescription: item.bankDescription,
                bankAccount: item.bankAccount,
                bankInitialBalance: item.bankInitialBalance,
                bankCurrentBalance: item.bankCurrentBalance,
                bankIsActive: item.bankIsActive,
                bankInsertedBy: item.bankInsertedBy,
                bankCreatedAt: item.created_at,
                bankUpdatedAt: item.updated_at,
              };
              banksMap.push(bank);
            });

            const bankList: BankStatusActive = {
              banks: banksMap,
            };

            return bankList;
          },
          (error) => {
            // Assign initial state as response
            const bankList: BankStatusActive = {
              banks: [],
            };

            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);

            return bankList;
          });
}

export function fetchBankById(userId: number, bankId: number) {

  let resStatus: any = null; 
  
  return fetch(`${ROUTES.SERVER}/bank-id/bankInsertedBy=${userId}&id=${bankId}`)
          .then(response => {
            resStatus = response.status;
            return response.json();
          })
          .then((result: any) => {
            switch (resStatus) {
              case 200:
              case 201:
                const bank: Bank = {
                  bankId: result.id,
                  bankDescription: result.bankDescription,
                  bankAccount: result.bankAccount,
                  bankInitialBalance: result.bankInitialBalance,
                  bankCurrentBalance: result.bankCurrentBalance,
                  bankIsActive: result.bankIsActive,
                  bankInsertedBy: result.bankInsertedBy,
                  bankCreatedAt: result.created_at,
                  bankUpdatedAt: result.updated_at,
                };
                return bank;
              default:
                toast(`Code: ${resStatus} -> Unhandled`, StatusColor.ERROR, 4000);
                return false;
            }
          }).catch((error) => {
            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);
            return false;
          })
}

export function addBank(data: Partial<Bank>) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/bank-new/bankInsertedBy=${data.bankInsertedBy}`, requestOptions)
          .then(response => {
            resStatus = response.status;
            return response.json();
          })
          .then((result: any) => {
            switch (resStatus) {
              case 200:
              case 201:
                const bank: Bank = {
                  bankId: result.bank.id,
                  bankDescription: result.bank.bankDescription,
                  bankAccount: result.bank.bankAccount,
                  bankInitialBalance: result.bank.bankInitialBalance,
                  bankCurrentBalance: result.bank.bankCurrentBalance,
                  bankIsActive: result.bank.bankIsActive,
                  bankInsertedBy: result.bank.bankInsertedBy,
                  bankCreatedAt: result.bank.created_at,
                  bankUpdatedAt: result.bank.updated_at,
                };
                toast(result.msg, StatusColor.SUCCESS, 4000);
                return bank;
              default:
                toast(`Code: ${resStatus} -> Unhandled`, StatusColor.ERROR, 4000);
                return false;
            }
          }).catch((error) => {
            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);
            return false;
          });
}

export function updateBank(data: Partial<Bank>) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/bank-id/bankInsertedBy=${data.bankInsertedBy}&id=${data.bankId}`, requestOptions)
  .then(response => {
    resStatus = response.status;
    return response.json();
  })
  .then((result: any) => {
    switch (resStatus) {
      case 200:
      case 201:
        const bank: Bank = {
          bankId: result.bank.id,
          bankDescription: result.bank.bankDescription,
          bankAccount: result.bank.bankAccount,
          bankInitialBalance: result.bank.bankInitialBalance,
          bankCurrentBalance: result.bank.bankCurrentBalance,
          bankIsActive: result.bank.bankIsActive,
          bankInsertedBy: result.bank.bankInsertedBy,
          bankCreatedAt: result.bank.created_at,
          bankUpdatedAt: result.bank.updated_at,
        };
        toast(result.msg, StatusColor.SUCCESS, 4000);
        return bank;
      default:
        toast(`Code: ${resStatus} -> Unhandled`, StatusColor.ERROR, 4000);
        return false;
    }
  }).catch((error) => {
    toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);
    return false;
  });

}
