import { toast } from '../../components/toast/Toast';
import { StatusColor } from '../../enum/StatusColor';
import { UserCredentials } from '../../models/UserCredentials';
import * as ROUTES from '../../constants/Routes';
import { UserProfileServer } from '../../models/UserProfileServer';

export function getUserCredentialsServer(credentials: UserCredentials) {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  };

  let resStatus: any = null;
  
  return fetch(`${ROUTES.SERVER}/login`, requestOptions)
          .then(res => {
            resStatus = res.status;
            return res.json();
          })
          .then((result: any) => {
            switch (resStatus) {
              case 200:
              case 201:
                const userProfile: UserProfileServer = Object.assign({}, {
                  userId: result.user.id,
                  name: result.user.name,
                  email: result.user.email
                })
                return userProfile;
              default:
                toast(`Code: ${resStatus} -> Unhandled`, StatusColor.ERROR, 4000);
                return false;
            }
          }).catch((error) => {
            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);
            return false;
          });

}

export function setUserCredentialsServer(credentials: UserCredentials) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  };

  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/signup`, requestOptions)
          .then(res => {
            resStatus = res.status;
            return res.json();
          })
          .then((result: any) => {
            switch (resStatus) {
              case 200:
              case 201:
                const userProfile: UserProfileServer = Object.assign({}, {
                  userId: result.user.id,
                  name: result.user.name,
                  email: result.user.email
                })
                return userProfile;
              default:
                toast(`Code: ${resStatus} -> Unhandled`, StatusColor.ERROR, 4000);
                return result;
            }
          }).catch((error) => {
            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);
            return false;
          });

}
