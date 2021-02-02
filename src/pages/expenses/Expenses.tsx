import React, { useState } from 'react';
import './Expenses.scss';
import {
  IonButton,
  IonButtons,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonMenuButton,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import { UserProfileServer } from '../../models/UserProfileServer';
import LsTimeTransition from '../../components/time/TimeTransition';
import * as MOMENT  from '../../util/moment';
import { setExpensesTimeTransition } from '../../data/sessions/sessions.actions';
import {
  addEndPeriod,
  addStartPeriod,
  endPeriod,
  startPeriod,
  subtractEndPeriod,
  subtractStartPeriod,
  dateFormatll
} from '../../util/moment';
import { Period } from '../../models/Period';
import { setExpenses } from '../../data/expenses/expenses.actions';
import LsMainExpenses from '../../components/expenses/MainExpenses';
import { AppColor } from '../../enum/AppColor';
import { add, close, ellipsisVertical, search } from 'ionicons/icons';

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
  expensesTimeTransition: Period;
}

interface DispatchProps {
  setExpensesTimeTransition: typeof setExpensesTimeTransition;
  setExpenses: typeof setExpenses;
}

interface ExpensesProps extends StateProps, DispatchProps {}

const ExpensesPage: React.FC<ExpensesProps> = ({
    isLoggedIn,
    userProfileServer,
    expensesTimeTransition,
    setExpensesTimeTransition,
    setExpenses,
  }) => {

  const [period, setPeriod] = useState<Period>({
    startDate: startPeriod(MOMENT.currentMonthYYYMMDD),
    endDate: endPeriod(MOMENT.currentMonthYYYMMDD),
  });

  const [params, setParams] = useState<string>('all');
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [showAddRecordModal, setShowAddRecordModal] = useState<boolean>(false);
  const [busy, setBusy] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState<string>(startPeriod(MOMENT.currentMonthYYYMMDD));
  const [selectedEndDate, setSelectedEndDate] = useState<string>(endPeriod(MOMENT.currentMonthYYYMMDD));
  const [selectedExpenses, setSelectedExpenses] = useState<any[]>([]);

  const decreasePeriod = (date: Period = period) => {
    const newDate: Period = Object.assign({}, {
      startDate: subtractStartPeriod(date.startDate),
      endDate: subtractEndPeriod(date.endDate),
    });
    setPeriod(newDate);
    setExpensesTimeTransition(newDate);
  };

  const increasePeriod = (date: Period = period) => {
    const newDate: Period = Object.assign({}, {
      startDate: addStartPeriod(date.startDate),
      endDate: addEndPeriod(date.endDate),
    });
    setPeriod(newDate);
    setExpensesTimeTransition(newDate);
  };

  const currentPeriod = () => {
    const newDate: Period = Object.assign({}, {
      startDate: startPeriod(MOMENT.currentMonthYYYMMDD),
      endDate: endPeriod(MOMENT.currentMonthYYYMMDD),
    });
    setPeriod(newDate);
    setExpensesTimeTransition(newDate);
  };

  const submitSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    setBusy(true);
    const newDate: Period = Object.assign({}, {
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    });
    setPeriod(newDate);
    setExpensesTimeTransition(newDate);
    setShowSearchModal(false);
    setBusy(false);

  }

  const submitAddRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setShowAddRecordModal(false);
  }

  if (isLoggedIn && userProfileServer) {
    if (period !== expensesTimeTransition) {
      setExpenses(userProfileServer.userId, period, params);
    }
  }

  return (
    <IonPage id="expenses-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton auto-hide="true"></IonMenuButton>
          </IonButtons>
          <IonTitle>Expenses</IonTitle>
          <IonFab vertical="center" horizontal="end">
            <IonFabButton color={AppColor.TERTIARY} size="small">
              <IonIcon icon={ellipsisVertical} />
            </IonFabButton>
            <IonFabList side="start">
              <IonFabButton><IonIcon color={AppColor.TERTIARY} icon={search} onClick={() => setShowSearchModal(true)} /></IonFabButton>
              <IonFabButton><IonIcon color={AppColor.SUCCESS} icon={add} onClick={() => setShowAddRecordModal(true)} /></IonFabButton>
            </IonFabList>
          </IonFab>
        </IonToolbar>
        <IonToolbar>
          <LsTimeTransition
            formatPeriod={`${dateFormatll(period.startDate)} - ${dateFormatll(period.endDate)}`}
            decreasePeriod={decreasePeriod}
            currentPeriod={currentPeriod}
            increasePeriod={increasePeriod} />
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={busy}></IonLoading>
      <IonModal isOpen={showSearchModal} onDidDismiss={() => setShowSearchModal(false)}>
        <form noValidate onSubmit={submitSearch}>
          <IonList lines="full">
            <IonListHeader>
              <IonLabel>Search Expenses</IonLabel>
              <IonButton onClick={() => setShowSearchModal(false)}>
                <IonIcon icon={close} color={AppColor.TERTIARY}>Close</IonIcon>
              </IonButton>
            </IonListHeader>
            <IonItem>
              <IonLabel>From</IonLabel>
              <IonDatetime displayFormat="MMM DD, YYYY" placeholder="Select Date" value={selectedStartDate} onIonChange={e => setSelectedStartDate(e.detail.value!)}></IonDatetime>
            </IonItem>
            <IonItem>
              <IonLabel>To</IonLabel>
              <IonDatetime displayFormat="MMM DD, YYYY" placeholder="Select Date" value={selectedEndDate} onIonChange={e => setSelectedEndDate(e.detail.value!)}></IonDatetime>
            </IonItem>
            <IonItem>
              <IonLabel>Expense</IonLabel>
{/* TODO: Retrieve expenses type */}
              <IonSelect multiple={true}>
                <IonSelectOption value="brown">Diesel/Petrol</IonSelectOption>
                <IonSelectOption value="blonde">Rent</IonSelectOption>
                <IonSelectOption value="black">Food/Drinks</IonSelectOption>
                <IonSelectOption value="red">Others</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem lines="none">
              <div slot="end" className="ion-padding-vertical">
                <IonButton type="submit" shape="round" color={AppColor.TERTIARY}>Search</IonButton>
              </div>
            </IonItem>
          </IonList>
        </form>
      </IonModal>
      <IonModal isOpen={showAddRecordModal} onDidDismiss={() => setShowAddRecordModal(false)}>
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
      </IonModal>
      <LsMainExpenses></LsMainExpenses>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps> ({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
    expensesTimeTransition: selectorsSessions.getExpensesTimeTransition(state),
  }),
  mapDispatchToProps: ({
    setExpensesTimeTransition,
    setExpenses,
  }),
  component: React.memo(ExpensesPage)
});
