import { UserType, UserTypeList } from '../../models/UserType';
import * as ROUTES from '../../constants/Routes';
import { toast } from '../../components/toast/Toast';
import { StatusColor } from '../../enum/StatusColor';
import { PageListItem } from '../../enum/PageListItem';

export function fetchUserTypeList(id: number, page: number, pageSize: number) {

  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/get-all-user-type/id=${id}&page=${page}&pageSize=${pageSize}`)
          .then(response => {
            resStatus = response.status;
            return response.json()
          })
          .then((result: UserTypeList) => {

            const usersTypeMap: UserType[] = [];
            result.usersType.forEach((item: any) => {
              const usersType: UserType = {
                userTypeId: item.id,
                userTypeDescription: item.peopleDescription,
                userTypeRates: item.peopleRates,
                userTypeOptions: item.peopleType,
                userTypeIsActive: item.peopleIsActive === 0 ? false : true,
                userTypeInsertedBy: item.peopleInsertedBy,
                userTypeCreatedAt: item.created_at,
                userTypeUpdatedAt: item.updated_at,
              };
              usersTypeMap.push(usersType);
            });

            const userTypeList: UserTypeList = {
              usersType: usersTypeMap,
              pagination: result.pagination
            };

            return userTypeList;
          },
          (error) => {
            // Assign initial state as response
            const userTypeList: UserTypeList = {
              usersType: [],
              pagination: {page: 1, pageSize: PageListItem.ITEM_12, pageCount: 0, rowCount: 0}
            };

            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);

            return userTypeList;
          });
}

export function fetchUserTypeById(userId: number, userTypeId: number) {

  let resStatus: any = null; 
  
  return fetch(`${ROUTES.SERVER}/user-type-id/userTypeInsertedBy=${userId}&id=${userTypeId}`)
          .then(response => {
            resStatus = response.status;
            return response.json();
          })
          .then((result: any) => {
            switch (resStatus) {
              case 200:
              case 201:
                const userType: UserType = {
                  userTypeId: result.id,
                  userTypeDescription: result.peopleDescription,
                  userTypeRates: result.peopleRates,
                  userTypeOptions: result.peopleType,
                  userTypeIsActive: result.peopleIsActive,
                  userTypeInsertedBy: result.peopleInsertedBy,
                  userTypeCreatedAt: result.created_at,
                  userTypeUpdatedAt: result.updated_at,
                };
                return userType;
              default:
                toast(`Code: ${resStatus} -> Unhandled`, StatusColor.ERROR, 4000);
                return false;
            }
          }).catch((error) => {
            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);
            return false;
          })
}

export function addUserType(data: Partial<UserType>) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/user-type-new/userTypeInsertedBy=${data.userTypeInsertedBy}`, requestOptions)
          .then(response => {
            resStatus = response.status;
            return response.json();
          })
          .then((result: any) => {
            switch (resStatus) {
              case 200:
              case 201:
                const userType: UserType = {
                  userTypeId: result.userType.id,
                  userTypeDescription: result.userType.peopleDescription,
                  userTypeRates: result.userType.peopleRates,
                  userTypeOptions: result.userType.peopleType,
                  userTypeIsActive: result.userType.peopleIsActive,
                  userTypeInsertedBy: result.userType.peopleInsertedBy,
                  userTypeCreatedAt: result.userType.created_at,
                  userTypeUpdatedAt: result.userType.updated_at,
                };
                toast(result.msg, StatusColor.SUCCESS, 4000);
                return userType;
              default:
                toast(`Code: ${resStatus} -> Unhandled`, StatusColor.ERROR, 4000);
                return false;
            }
          }).catch((error) => {
            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);
            return false;
          });
}

export function updateUserType(data: Partial<UserType>) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/user-type-id/userTypeInsertedBy=${data.userTypeInsertedBy}&id=${data.userTypeId}`, requestOptions)
  .then(response => {
    resStatus = response.status;
    return response.json();
  })
  .then((result: any) => {
    switch (resStatus) {
      case 200:
      case 201:
        const userType: UserType = {
          userTypeId: result.userType.id,
          userTypeDescription: result.userType.peopleDescription,
          userTypeRates: result.userType.peopleRates,
          userTypeOptions: result.userType.peopleType,
          userTypeIsActive: result.userType.peopleIsActive,
          userTypeInsertedBy: result.userType.peopleInsertedBy,
          userTypeCreatedAt: result.userType.created_at,
          userTypeUpdatedAt: result.userType.updated_at,
        };
        toast(result.msg, StatusColor.SUCCESS, 4000);
        return userType;
      default:
        toast(`Code: ${resStatus} -> Unhandled`, StatusColor.ERROR, 4000);
        return false;
    }
  }).catch((error) => {
    toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);
    return false;
  });

}
