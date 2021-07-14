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
import { PageListItem } from '../../enum/PageListItem';
import LsListItemBank from '../../components/list/ListItemBank';
import {
  setBankList,
} from '../../data/bank/bank.actions';
import { add } from 'ionicons/icons';
import LsModalBank from '../../components/modal/ModalBank';
import { setModalBankShow } from '../../data/modal/modal.actions';

interface StateProps {
  isLoggedIn: boolean;
  isFetching: boolean;
  userProfileServer: UserProfileServer;
}

interface DispatchProps {
  setBankList: typeof setBankList;
  setModalBankShow: typeof setModalBankShow;
}

interface BankProps extends StateProps, DispatchProps {}

const BankPage: React.FC<BankProps> = ({
  isLoggedIn,
  isFetching,
  userProfileServer,
  setBankList,
  setModalBankShow,
}) => {
  
  useEffect(() => {
    if (isLoggedIn && userProfileServer) {
      setBankList(userProfileServer.userId, 1, PageListItem.ITEM_12);
    }
  }, [
    isLoggedIn,
    userProfileServer,
    setBankList,
    setModalBankShow,  
  ]);
  
  return (
    <IonPage id="bank-page">
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
                onClick={() => setModalBankShow(true)}
                size="small"
              />
            </IonFabButton>
          </IonFab>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={isFetching}></IonLoading>
      <IonContent className="ion-no-padding">
        <LsListItemBank />
        <LsModalBank />
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    isFetching: selectorsBank.isFetchingBankList(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
  }),
  mapDispatchToProps: ({
    setBankList,
    setModalBankShow,
  }),
  component: React.memo(BankPage)
});
