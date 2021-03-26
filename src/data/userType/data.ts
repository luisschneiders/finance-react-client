import {
  UserType,
  UserTypeList
} from '../../models/UserType';

import {
  fetchUserTypeList,
  addUserType,
  updateUserType,
  fetchUserTypeById
} from '../api/UserType';

export const fetchUserTypeData = async (id: number, page: number, pageSize: number) => {
  const response: any = await fetchUserTypeList(id, page, pageSize);
  return response as UserTypeList;
}

export const fetchUserTypeByIdData = async (userId: number, userTypeId: number) => {
  const response: any = await fetchUserTypeById(userId, userTypeId);
  return response as UserType;
}

export const addUserTypeData = async (data: Partial<UserType>) => {
  const response: any = await addUserType(data);
  return response as UserType;
}

export const updateUserTypeData = async (data: Partial<UserType>) => {
  const response: any = await updateUserType(data);
  return response as UserType;
}
