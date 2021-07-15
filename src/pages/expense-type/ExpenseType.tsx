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
import * as selectorsExpenseType from '../../data/expenseType/expenseType.selectors';
import { PageListItem } from '../../enum/PageListItem';
import LsListItemExpenseType from '../../components/list/ListItemExpenseType';
import {
  setExpenseTypeList
} from '../../data/expenseType/expenseType.actions';
import { add } from 'ionicons/icons';
import { setModalExpenseTypeShow } from '../../data/modal/modal.actions';
import LsModalExpenseType from '../../components/modal/ModalExpenseType';

interface StateProps {
  isLoggedIn: boolean;
  isFetching: boolean;
  userProfileServer: UserProfileServer;
}

interface DispatchProps {
  setExpenseTypeList: typeof setExpenseTypeList;
  setModalExpenseTypeShow: typeof setModalExpenseTypeShow;
}

interface ExpensesTypeProps extends StateProps, DispatchProps {}

const ExpenseTypePage: React.FC<ExpensesTypeProps> = ({
  isLoggedIn,
  isFetching,
  userProfileServer,
  setExpenseTypeList,
  setModalExpenseTypeShow
}) => {
  
  useEffect(() => {
    if (isLoggedIn && userProfileServer) {
      setExpenseTypeList(userProfileServer.userId, 1, PageListItem.ITEM_12);
    }
  }, [
    isLoggedIn,
    userProfileServer,
    setExpenseTypeList,
    setModalExpenseTypeShow,
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Expense Categories</IonTitle>
          <IonFab vertical="center" horizontal="end">
            <IonFabButton
              color={AppColor.TERTIARY}
              size="small"
              title="Add new record"
              onClick={() => setModalExpenseTypeShow(true)}
            >
              <IonIcon 
                icon={add}
                size="small"
              />
            </IonFabButton>
          </IonFab>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={isFetching}></IonLoading>
      <IonContent className="ion-no-padding">
        <LsListItemExpenseType />
        <LsModalExpenseType />
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    isFetching: selectorsExpenseType.isFetchingExpenseTypeList(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
  }),
  mapDispatchToProps: ({
    setExpenseTypeList,
    setModalExpenseTypeShow,
  }),
  component: React.memo(ExpenseTypePage)
});
