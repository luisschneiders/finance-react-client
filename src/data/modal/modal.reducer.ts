import {
  MODAL_BANK_SHOW_SET,
  MODAL_EXPENSE_TYPE_SHOW_SET,
  MODAL_VEHICLE_SHOW_SET,
} from '../actionTypes';
import { ModalAction } from './modal.actions';
import { ModalState } from './modal.state';

export const modalReducer = (state: ModalState, action: ModalAction) : ModalState => {
  switch (action.type) {
    case MODAL_BANK_SHOW_SET:
      return {
        ...state,
        isShowModalBank: action.payload
      }
    case MODAL_VEHICLE_SHOW_SET:
      return {
        ...state,
        isShowModalVehicle: action.payload
      }
    case MODAL_EXPENSE_TYPE_SHOW_SET:
      return {
        ...state,
        isShowModalExpenseType: action.payload
      }
  }
}
