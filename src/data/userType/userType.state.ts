import { UserType } from "../../models/UserType";
import { Pagination } from "../../models/Pagination";

export interface UserTypeListState {
  userTypeList: {
    usersType: UserType[];
    pagination: Pagination;
  };
  userType: UserType;
  isFetching: boolean;
  isSaving: boolean;
}
