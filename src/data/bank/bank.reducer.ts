import {
  BANK_ADD,
  BANK_LIST_SET,
  BANK_LIST_IS_FETCHING,
  BANK_IS_SAVING,
  BANK_UPDATE,
  BANK_BY_ID_SET,
  BANK_MODAL_SHOW,
} from '../actionTypes';
import { BankAction } from './bank.actions';
import { BankListState } from './bank.state';

export const bankReducer = (state: BankListState, action: BankAction) : BankListState => {
  switch (action.type) {
    case BANK_ADD:
      // Add new Bank in the list, 
      // then remove the last item from the array list
      // and check if page is smaller than pageCount, to prevent the slice
      const banks: any[] = (
        state.bankList.pagination.page < state.bankList.pagination.pageCount ?
        state.bankList.banks.slice(0, -1) : state.bankList.banks
      );

      return {
        ...state,
        bankList: {
          banks: [action.payload, ...banks],
          pagination: {...state.bankList.pagination},
        }
      };
    case BANK_UPDATE:
      return {
        ...state
      };
    case BANK_LIST_SET:
      return {
        ...state,
        bankList: {
          banks: [...state.bankList.banks, ...action.payload.banks],
          pagination: {...state.bankList.pagination, ...action.payload.pagination},
        }
      }
    case BANK_BY_ID_SET:
      return {
        ...state,
        bank: action.payload
      }
    case BANK_LIST_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case BANK_IS_SAVING:
      return {
        ...state,
        isSaving: action.payload
      }
    case BANK_MODAL_SHOW:
      return {
        ...state,
        showBankModal: action.payload
      }
  }
}
