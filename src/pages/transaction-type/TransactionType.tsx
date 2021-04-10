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
import * as selectorsTransactionType from '../../data/transactionType/transactionType.selectors';
import { PageListItem } from '../../enum/PageListItem';
import LsListItemTransactionType from '../../components/list/ListItemTransactionType';
import {
  setTransactionTypeList
} from '../../data/transactionType/transactionType.actions';
import { add } from 'ionicons/icons';
import { setModalTransactionTypeShow } from '../../data/modal/modal.actions';
import LsModalTransactionType from '../../components/modal/ModalTransactionType';

interface StateProps {
  isLoggedIn: boolean;
  isFetching: boolean;
  userProfileServer: UserProfileServer;
}

interface DispatchProps {
  setTransactionTypeList: typeof setTransactionTypeList;
  setModalTransactionTypeShow: typeof setModalTransactionTypeShow;
}

interface TransactionTypeProps extends StateProps, DispatchProps {}

const TransactionTypePage: React.FC<TransactionTypeProps> = ({
  isLoggedIn,
  isFetching,
  userProfileServer,
  setTransactionTypeList,
  setModalTransactionTypeShow,
}) => {
 
  useEffect(() => {
    if (isLoggedIn && userProfileServer) {
      setTransactionTypeList(userProfileServer.userId, 1, PageListItem.ITEM_12);
    }
  }, [
    isLoggedIn,
    userProfileServer,
    setTransactionTypeList,
    setModalTransactionTypeShow,
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Transactions Categories</IonTitle>
          <IonFab vertical="center" horizontal="end">
            <IonFabButton color={AppColor.TERTIARY} size="small" title="Add new record">
              <IonIcon
                icon={add}
                onClick={() => setModalTransactionTypeShow(true)}
                size="small"
              />
            </IonFabButton>
          </IonFab>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={isFetching}></IonLoading>
      <IonContent className="ion-padding">
        <LsListItemTransactionType />
        <LsModalTransactionType />
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    isFetching: selectorsTransactionType.isFetchingTransactionTypeList(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
  }),
  mapDispatchToProps: ({
    setTransactionTypeList,
    setModalTransactionTypeShow,
  }),
  component: React.memo(TransactionTypePage)
});
