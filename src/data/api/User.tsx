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
                  userId: result.id,
                  name: result.name,
                  email: result.email
                })
                return userProfile;
              case 400:
                toast(result.error, StatusColor.ERROR, 4000);
                return false;
              case 401:
                toast(result.error, StatusColor.ERROR, 4000);
                return false;
              default:
                toast('Unhandled', StatusColor.ERROR, 4000);
                return false;
            }
          }).catch((error) => {
            toast(error.msg, StatusColor.ERROR, 4000);
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
                  userId: result.id,
                  name: result.name,
                  email: result.email
                })
                return userProfile;
              case 400:
                toast(result.error, StatusColor.ERROR, 4000);
                return false;
              case 401:
                toast(result.error, StatusColor.ERROR, 4000);
                return false;
              default:
                toast('Unhandled', StatusColor.ERROR, 4000);
                return false;
            }
          }).catch((error) => {
            toast(error.msg, StatusColor.ERROR, 4000);
            return false;
          });

}
