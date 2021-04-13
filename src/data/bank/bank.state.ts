import { Bank } from "../../models/Bank";
import { Pagination } from "../../models/Pagination";

export interface BankListState {
  bankList: {
    banks: Bank[];
    pagination: Pagination;
  };
  bankStatusActive: {
    banks: Bank[];
  };
  bank: Bank;
  isFetching: boolean;
  isSaving: boolean;
  showBankModal: boolean;
}
