export interface Transactions {
  transactionId: number;
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
  transactionCreatedAt: Date;
  transactionUpdatedAt: Date;
}
