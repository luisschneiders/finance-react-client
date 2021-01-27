export interface TransactionsGroup {
  groups: Transactions[];
}

export interface Transactions {
  transactionId: number;
  transactionLink: number;
  transactionDate: string;
  transactionFromBank: number;
  transactionToBank: number;
  transactionTypeId: number;
  transactionAction: string;
  transactionLabel: string;
  transactionAmount: number;
  transactionComments: string;
  transactionInsertedBy: number;
  transactionFlag: string;
  transactionCreatedAt: string;
  transactionUpdatedAt: string;

  // TODO: Get info from selectors
  transactionBankDescription: string;
  transactionTypeDescription: string;
}
