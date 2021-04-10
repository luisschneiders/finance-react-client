import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useEffect } from 'react';
import { connect } from '../../data/connect';
import { AppColor } from '../../enum/AppColor';
import { UserProfileServer } from '../../models/UserProfileServer';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsUserType from '../../data/userType/userType.selectors';
import { PageListItem } from '../../enum/PageListItem';
import LsListItemUserType from '../../components/list/ListItemUserType';
import {
  setUserTypeList
} from '../../data/userType/userType.actions';
import { add } from 'ionicons/icons';
import { setModalUserTypeShow } from '../../data/modal/modal.actions';
import LsModalUserType from '../../components/modal/ModalUserType';

interface StateProps {
  isLoggedIn: boolean;
  isFetching: boolean;
  userProfileServer: UserProfileServer;
}

interface DispatchProps {
  setUserTypeList: typeof setUserTypeList;
  setModalUserTypeShow: typeof setModalUserTypeShow;
}

interface UserTypeProps extends StateProps, DispatchProps {}

const UserTypePage: React.FC<UserTypeProps> = ({
  isLoggedIn,
  isFetching,
  userProfileServer,
  setUserTypeList,
  setModalUserTypeShow,
}) => {
 
  useEffect(() => {
    if (isLoggedIn && userProfileServer) {
      setUserTypeList(userProfileServer.userId, 1, PageListItem.ITEM_12);
    }
  }, [
    isLoggedIn,
    userProfileServer,
    setUserTypeList,
    setModalUserTypeShow,
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Users</IonTitle>
          <IonFab vertical="center" horizontal="end">
            <IonFabButton color={AppColor.TERTIARY} size="small" title="Add new record">
              <IonIcon
                icon={add}
                onClick={() => setModalUserTypeShow(true)}
                size="small"
              />
            </IonFabButton>
          </IonFab>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={isFetching}></IonLoading>
      <IonContent className="ion-padding">
        <LsListItemUserType />
        <LsModalUserType />
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    isFetching: selectorsUserType.isFetchingUserTypeList(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
  }),
  mapDispatchToProps: ({
    setUserTypeList,
    setModalUserTypeShow,
  }),
  component: React.memo(UserTypePage)
});
