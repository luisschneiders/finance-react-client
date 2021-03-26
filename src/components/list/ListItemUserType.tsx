import React, { useEffect, useState } from 'react';
import {
  IonLabel,
  IonItem,
  IonList,
  IonButton,
  IonToggle,
} from '@ionic/react';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsUserType from '../../data/userType/userType.selectors';
import { UserType, UserTypeList } from '../../models/UserType';
import { AppColor } from '../../enum/AppColor';
import { StatusColor } from '../../enum/StatusColor';
import {
  setUserTypeList,
  updateUserType
} from '../../data/userType/userType.actions';
import { UserProfileServer } from '../../models/UserProfileServer';
import { PageSize } from '../../enum/PageSize';
import LsMainCard from '../card/MainCard';
import * as ROUTES from '../../constants/Routes';
import { currencyMask } from '../../util/currencyMask';

interface StateProps {
  isLoggedIn: boolean;
  isFetching: boolean;
  userProfileServer: UserProfileServer;
  userTypeList: UserTypeList;
}

interface DispatchProps {
  setUserTypeList: typeof setUserTypeList;
  updateUserType: typeof updateUserType;
}

interface ListUserTypeProps extends StateProps, DispatchProps {}

const LsListItemUserType: React.FC<ListUserTypeProps> = ({
    isLoggedIn,
    isFetching,
    userProfileServer,
    userTypeList,
    setUserTypeList,
    updateUserType,
  }) => {
  const [userType, setUserType] = useState<UserType[]>([]);

  useEffect(() => {
    if (userTypeList) {
      setUserType(userTypeList.usersType);
    }
  }, [userTypeList, isFetching]);

  const loadMore = () => {
    if (isLoggedIn && userProfileServer) {
      let newPage: number = userTypeList.pagination.page;
      ++newPage;
      setUserTypeList(userProfileServer.userId, newPage, PageSize.S_12);
    }
  };

  const changeStatus = async (userType: UserType) => {
    if (userType) {
      const newUserType: UserType = userType;
      newUserType.userTypeIsActive = !userType.userTypeIsActive

      updateUserType(newUserType);
    }
  }
  
  return (
    <>
      {userType && userType.length > 0 &&
        <IonList lines="full">
          {userType.map((item: UserType, index: number) => (
            <IonItem key={index}>
              <IonLabel>
                <IonItem
                  className="ion-text-uppercase"
                  lines="none"
                  routerLink={`${ROUTES.SETUP_USER_TYPE}/${item.userTypeId}`}
                >
                  <IonLabel>
                    <div className="ion-text-capitalize">User: </div>
                    <div className={item.userTypeIsActive ? StatusColor.IS_ACTIVE : StatusColor.IS_INACTIVE}>
                      {item.userTypeDescription}
                    </div>
                  </IonLabel>
                  <IonLabel>
                    <div className="ion-text-capitalize">Rate: </div>
                    <div className={item.userTypeIsActive ? StatusColor.IS_ACTIVE : StatusColor.IS_INACTIVE}>
                      {currencyMask('en-AU', item.userTypeRates, 'AUD')}
                    </div>
                  </IonLabel>
                  <IonLabel>
                    <div className="ion-text-capitalize">Type: </div>
                    <div className={item.userTypeIsActive ? StatusColor.IS_ACTIVE : StatusColor.IS_INACTIVE}>
                      {item.userTypeOptions}
                    </div>
                  </IonLabel>
                </IonItem>
              </IonLabel>
              <div slot="end">
                <IonToggle color={StatusColor.SUCCESS} checked={item.userTypeIsActive} onClick={() => changeStatus(item)} />
              </div>
            </IonItem>
          ))}
        </IonList>
      }
      {userType && userType.length > 0 && (userTypeList.pagination.pageCount > userTypeList.pagination.page) &&
        <div className="ion-text-center">
          <IonButton fill="clear" color={AppColor.TERTIARY} disabled={isFetching} onClick={loadMore}>Load more...</IonButton>
        </div>
      }
      {!userType.length && 
        <LsMainCard color={StatusColor.WARNING} message="No records found!"></LsMainCard>
      }
    </>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isFetching: selectorsUserType.isFetchingUserTypeList(state),
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
    userTypeList: selectorsUserType.getUserTypeList(state),
  }),
  mapDispatchToProps: ({
    setUserTypeList,
    updateUserType,
  }),
  component: LsListItemUserType
});
