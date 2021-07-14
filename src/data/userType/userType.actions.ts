import { UserType, UserTypeList } from '../../models/UserType';
import { ActionType } from '../../util/types';
import {
  USER_TYPE_ADD,
  USER_TYPE_LIST_SET,
  USER_TYPE_LIST_IS_FETCHING,
  USER_TYPE_IS_SAVING,
  USER_TYPE_UPDATE,
  USER_TYPE_BY_ID_SET,
} from '../actionTypes';
import {
  fetchUserTypeData,
  addUserTypeData,
  updateUserTypeData,
  fetchUserTypeByIdData
} from './data';

const saveUserTypeAction = (data: UserType) => {
  return ({
    type: USER_TYPE_ADD,
    payload: data
  } as const);
}

const updateUserTypeAction = (data: UserType) => {
  return ({
    type: USER_TYPE_UPDATE,
    payload: data
  } as const);
}

const setUserTypeListAction = (data: UserTypeList) => {
  return ({
    type: USER_TYPE_LIST_SET,
    payload: data
  } as const);
}

const setUserTypeByIdAction = (data: UserType) => {
  return ({
    type: USER_TYPE_BY_ID_SET,
    payload: data
  } as const);
}

const isFetchingUserTypeListAction = (isFetching: boolean) => {
  return ({
    type: USER_TYPE_LIST_IS_FETCHING,
    payload: isFetching
  } as const);
}

const isSavingUserTypeAction = (isSaving: boolean) => {
  return ({
    type: USER_TYPE_IS_SAVING,
    payload: isSaving
  } as const);
}

export const isFetchingUserTypeList = (isFetching: boolean) => async () => {
  return isFetchingUserTypeListAction(isFetching);
}

export const isSavingUserType = (isSaving: boolean) => async () => {
  return isSavingUserTypeAction(isSaving);
}

export const setUserTypeList = (id: number, page: number, pageSize: number) => async (dispatch: React.Dispatch<any>) => {
  // dispatch(isFetchingUserTypeListAction(true));
  const data = await fetchUserTypeData(id, page, pageSize);
  // dispatch(isFetchingUserTypeListAction(false));
  return setUserTypeListAction(data);
}

export const setUserTypeById = (userId: number, userTypeId: number) => async (dispatch: React.Dispatch<any>) => {

  const data = await fetchUserTypeByIdData(userId, userTypeId);

  return setUserTypeByIdAction(data);
}

export const addUserType = (data: Partial<UserType>) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isSavingUserTypeAction(true));
  const userType = await addUserTypeData(data);
  dispatch(isSavingUserTypeAction(false));
  return saveUserTypeAction(userType);
}

export const updateUserType = (data: Partial<UserType>) => async (dispatch: React.Dispatch<any>) => {
  const userType = await updateUserTypeData(data);
  return updateUserTypeAction(userType);
}

export type UserTypeAction = 
  | ActionType<typeof addUserType>
  | ActionType<typeof updateUserType>
  | ActionType<typeof setUserTypeList>
  | ActionType<typeof setUserTypeById>
  | ActionType<typeof isFetchingUserTypeList>
  | ActionType<typeof isSavingUserType>
