export interface ExpensesGroup {
  groups: Expenses[];
  totalAmount: number;
}

export interface Expenses {
  expenseId: number;
  expenseDate: string;
  expenseBank: number;
  expenseTypeId: number;
  expenseAmount:number;
  expenseComments: string;
  expenseTransactionTypeId: number;
  expenseInsertedBy: number;
  expenseFlag:  string;
  expenseCreatedAt: string;
  expenseUpdatedAt: string;
  expenseAddress: string;
  expenseLatitude: number;
  expenseLongitude: number;

  // TODO: Get info from selectors
  expenseBankDescription: string;
  expenseTypeDescription: string;
}
