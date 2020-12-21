export interface Transactions {
  id: number;
  transactionLink: number;
  transactionDate: string;
  transactionFromBank: number;
  transactionToBank: number;
  transactionType: number;
  transactionAction: string;
  transactionLabel: string;
  transactionAmount: number;
  transactionComments: string;
  transactionInsertedBy: number;
  transactionFlag: string;
  transactioncreatedAt: Date;
  transactionupdatedAt: Date;
}
