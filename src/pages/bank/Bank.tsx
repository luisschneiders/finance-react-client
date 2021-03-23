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
import * as selectorsBank from '../../data/bank/bank.selectors';
import { PageSize } from '../../enum/PageSize';
import LsListItemBank from '../../components/list/ListItemBank';
import {
  setBankList,
  setBankModalShow
} from '../../data/bank/bank.actions';
import { add } from 'ionicons/icons';
import LsModalBank from '../../components/modal/ModalBank';

interface StateProps {
  isLoggedIn: boolean;
  isSaving: boolean;
  isFetching: boolean;
  userProfileServer: UserProfileServer;
}

interface DispatchProps {
  setBankList: typeof setBankList;
  setBankModalShow: typeof setBankModalShow;
}

interface BankProps extends StateProps, DispatchProps {}

const BankPage: React.FC<BankProps> = ({
  isLoggedIn,
  isFetching,
  userProfileServer,
  setBankList,
  setBankModalShow,
}) => {
  
  useEffect(() => {
    if (isLoggedIn && userProfileServer) {
      setBankList(userProfileServer.userId, 1, PageSize.S_12);
    }
  }, [isLoggedIn, userProfileServer, setBankList, setBankModalShow]);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Banks</IonTitle>
          <IonFab vertical="center" horizontal="end">
            <IonFabButton color={AppColor.TERTIARY} size="small" title="Add new record">
              <IonIcon
                icon={add}
                onClick={() => setBankModalShow(true)}
                size="small"
              />
            </IonFabButton>
          </IonFab>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={isFetching}></IonLoading>
      <IonContent className="ion-padding">
        <LsListItemBank />
        <LsModalBank />
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    isSaving: selectorsBank.isSavingBank(state),
    isFetching: selectorsBank.isFetchingBankList(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
  }),
  mapDispatchToProps: ({
    setBankList,
    setBankModalShow,
  }),
  component: React.memo(BankPage)
});
