import {
  USER_TYPE_ADD,
  USER_TYPE_LIST_SET,
  USER_TYPE_LIST_IS_FETCHING,
  USER_TYPE_IS_SAVING,
  USER_TYPE_UPDATE,
  USER_TYPE_BY_ID_SET,
} from '../actionTypes';
import { UserTypeAction } from './userType.actions';
import { UserTypeListState } from './userType.state';

export const userTypeReducer = (state: UserTypeListState, action: UserTypeAction) : UserTypeListState => {
  switch (action.type) {
    case USER_TYPE_ADD:
      // Add new User in the list, 
      // then remove the last item from the array list
      // and check if page is smaller than pageCount, to prevent the slice
      const usersType: any[] = (
        state.userTypeList.pagination.page < state.userTypeList.pagination.pageCount ?
        state.userTypeList.usersType.slice(0, -1) : state.userTypeList.usersType
      );

      return {
        ...state,
        userTypeList: {
          usersType: [action.payload, ...usersType],
          pagination: {...state.userTypeList.pagination},
        }
      };
    case USER_TYPE_UPDATE:
      return {
        ...state
      };
    case USER_TYPE_LIST_SET:
      return {
        ...state,
        userTypeList: {
          usersType: [...state.userTypeList.usersType, ...action.payload.usersType],
          pagination: {...state.userTypeList.pagination, ...action.payload.pagination},
        }
      }
    case USER_TYPE_BY_ID_SET:
      return {
        ...state,
        userType: action.payload
      }
    case USER_TYPE_LIST_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case USER_TYPE_IS_SAVING:
      return {
        ...state,
        isSaving: action.payload
      }
  }
}
