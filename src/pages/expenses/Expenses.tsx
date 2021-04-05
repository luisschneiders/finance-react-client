import React, { useEffect, useState } from 'react';
import './Expenses.scss';
import {
  IonButtons,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import { UserProfileServer } from '../../models/UserProfileServer';
import * as MOMENT  from '../../util/moment';
import {
  endPeriod,
  startPeriod,
} from '../../util/moment';
import { Period } from '../../models/Period';
import { setExpenses } from '../../data/expenses/expenses.actions';
import LsMainExpenses from '../../components/expenses/MainExpenses';
import { AppColor } from '../../enum/AppColor';
import { ellipsisVertical, search } from 'ionicons/icons';
import LsModalExpensesSearch from '../../components/modal/ModalExpensesSearch';
import { setModalExpensesSearchShow } from '../../data/modal/modal.actions';
import LsTransition from '../../components/time/Transition';
import { setExpenseTypeByStatusActive } from '../../data/expenseType/expenseType.actions';

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
}

interface DispatchProps {
  setExpenses: typeof setExpenses;
  setModalExpensesSearchShow: typeof setModalExpensesSearchShow;
  setExpenseTypeByStatusActive: typeof setExpenseTypeByStatusActive;
}

interface ExpensesProps extends StateProps, DispatchProps {}

const ExpensesPage: React.FC<ExpensesProps> = ({
    isLoggedIn,
    userProfileServer,
    setExpenses,
    setModalExpensesSearchShow,
    setExpenseTypeByStatusActive,
  }) => {

  const [period, setPeriod] = useState<Period>({
    startDate: startPeriod(MOMENT.currentMonthYYYMMDD),
    endDate: endPeriod(MOMENT.currentMonthYYYMMDD),
  });

  const [isCustomSearch, setIsCustomSearch] = useState<boolean>(false);
  const [customPeriod, setCustomPeriod] = useState<Period>(period);
  const [params, setParams] = useState<string>('all');

  useEffect(() => {
    if (isLoggedIn && userProfileServer) {
      if (!isCustomSearch) {
        setExpenses(userProfileServer.userId, period, params);
      } else {
        setIsCustomSearch(false);
        setPeriod(customPeriod);
      }
    }
  }, [
    isLoggedIn,
    userProfileServer,
    params,
    period,
    isCustomSearch,
    customPeriod,
    setExpenses,
    setExpenseTypeByStatusActive,
  ]);

  return (
    <IonPage id="expenses-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton auto-hide="true"></IonMenuButton>
          </IonButtons>
          <IonTitle>Expenses</IonTitle>
          {(isLoggedIn && userProfileServer) && <IonFab vertical="center" horizontal="end">
            <IonFabButton color={AppColor.TERTIARY} size="small">
              <IonIcon icon={ellipsisVertical} />
            </IonFabButton>
            <IonFabList side="start">
              <IonFabButton 
                onClick={() => [setModalExpensesSearchShow(true), setExpenseTypeByStatusActive(userProfileServer.userId)]}
              >
                <IonIcon
                  color={AppColor.TERTIARY}
                  icon={search}
                 />
              </IonFabButton>
              {/* <IonFabButton><IonIcon color={AppColor.SUCCESS} icon={add} onClick={() => setShowAddRecordModal(true)} /></IonFabButton> */}
            </IonFabList>
          </IonFab>}
        </IonToolbar>
        <IonToolbar>
          <LsTransition
            period={period}
            setPeriod={setPeriod}
          />
        </IonToolbar>
      </IonHeader>
      <LsMainExpenses />
      <LsModalExpensesSearch
        setIsCustomSearch={setIsCustomSearch}
        setCustomPeriod={setCustomPeriod}
        setParams={setParams}
      />

      {/* <IonModal isOpen={showAddRecordModal} onDidDismiss={() => setShowAddRecordModal(false)}>
        <form noValidate onSubmit={submitAddRecord}>
        <IonList lines="full">
          <IonListHeader>
            <IonLabel>Add New Expense</IonLabel>
            <IonButton onClick={() => setShowAddRecordModal(false)}>
              <IonIcon icon={close} color={AppColor.TERTIARY}>Close</IonIcon>
            </IonButton>
          </IonListHeader>
          <IonItem>
            <IonLabel>Location</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Date</IonLabel>
            <IonDatetime displayFormat="MMM DD, YYYY" placeholder="Select Date" value={selectedStartDate} onIonChange={e => setSelectedStartDate(e.detail.value!)}></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>Bank</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Expense</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Comments</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Amount</IonLabel>
          </IonItem>
          <IonItem lines="none">
              <div slot="end" className="ion-padding-vertical">
                <IonButton type="submit" shape="round" color={AppColor.SUCCESS}>Add Expense</IonButton>
              </div>
            </IonItem>
        </IonList>
        </form>
      </IonModal> */}
        {/* <LsModalExpensesAdd /> */}
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps> ({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
  }),
  mapDispatchToProps: ({
    setExpenses,
    setModalExpensesSearchShow,
    setExpenseTypeByStatusActive,
  }),
  component: React.memo(ExpensesPage)
});
