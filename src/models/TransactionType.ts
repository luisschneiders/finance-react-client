import { Pagination } from './Pagination';

export interface TransactionType {
  transactionTypeId: number;
  transactionTypeDescription: string;
  transactionTypeAction: string;
  transactionTypeIsActive: boolean;
  transactionTypeInsertedBy: number;
  transactionTypeCreatedAt: string;
  transactionTypeUpdatedAt: string;
}

export interface TransactionTypeList {
  transactionsType: TransactionType[];
  pagination: Pagination;
}
