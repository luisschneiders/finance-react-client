import { Pagination } from './Pagination';

export interface UserType {
  userTypeId: number;
  userTypeDescription: string;
  userTypeRates: number;
  userTypeOptions: number;
  userTypeIsActive: boolean;
  userTypeInsertedBy: number;
  userTypeCreatedAt: string;
  userTypeUpdatedAt: string;
}

export interface UserTypeList {
  usersType: UserType[];
  pagination: Pagination;
}
