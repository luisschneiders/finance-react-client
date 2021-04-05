import { TransactionType } from "../../models/TransactionType";
import { Pagination } from "../../models/Pagination";

export interface TransactionTypeListState {
  transactionTypeList: {
    transactionsType: TransactionType[];
    pagination: Pagination;
  };
  transactionTypeStatusActive: {
    transactionsType: TransactionType[];
  }
  transactionType: TransactionType;
  isFetching: boolean;
  isSaving: boolean;
}
