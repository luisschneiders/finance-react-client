import { TransactionType } from "../../models/TransactionType";
import { Pagination } from "../../models/Pagination";

export interface TransactionTypeListState {
  transactionTypeList: {
    transactionsType: TransactionType[];
    pagination: Pagination;
  };
  transactionType: TransactionType;
  isFetching: boolean;
  isSaving: boolean;
}
