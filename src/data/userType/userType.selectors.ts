import { createSelector } from 'reselect';
import { UserType, UserTypeList } from '../../models/UserType';
import { AppState } from '../app/app.state';

const getUserTypeListData = (state: AppState) => state.userTypeReducer.userTypeList;
const getUserTypeData = (state: AppState) => state.userTypeReducer.userType;
const isFetchingUserTypeListData = (state: AppState) => state.userTypeReducer.isFetching;
const isSavingUserTypeData = (state: AppState) => state.userTypeReducer.isSaving;
const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
};

export const getUserTypeList = createSelector(
  getUserTypeListData,
  (userTypeList: UserTypeList) => {
    return userTypeList;
  }
);

export const isFetchingUserTypeList = createSelector(
  isFetchingUserTypeListData,
  (isFetching: boolean) => {
    return isFetching;
  }
);

export const isSavingUserType = createSelector(
  isSavingUserTypeData,
  (isSaving: boolean) => {
    return isSaving;
  }
);

export const getUserTypeFromList = createSelector(
  getUserTypeListData, getIdParam,
  (userTypeList: UserTypeList, id: number) => {
    if (userTypeList && userTypeList.usersType && userTypeList.usersType.length > 0) {
      return userTypeList.usersType.find((e: any) => e.userTypeId.toString() === id);
    }
  }  
);

export const getUserType = createSelector(
  getUserTypeData,
  (usersType: UserType) => {
    return usersType;
  }  
);
