import React, { useState } from 'react';
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { connect } from '../../data/connect';
import LsTimeTransition from '../../components/time/TimeTransition';
import {
  addEndPeriod,
  addStartPeriod,
  dateFormatll,
  endPeriod,
  startPeriod,
  subtractEndPeriod,
  subtractStartPeriod
} from '../../util/moment';
import { Period } from '../../models/Period';
import * as MOMENT  from '../../util/moment';
import { setTransactionsTimeTransition } from '../../data/sessions/sessions.actions';
import { UserProfileServer } from '../../models/UserProfileServer';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import { setTransactions } from '../../data/transactions/transactions.actions';
import LsMainTransactions from '../../components/transactions/MainTransactions';

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
  transactionsTimeTransition: Period;
}

interface DispatchProps {
  setTransactionsTimeTransition: typeof setTransactionsTimeTransition;
  setTransactions: typeof setTransactions;
}

interface TransactionsProps extends StateProps, DispatchProps {}

const TransactionsPage: React.FC<TransactionsProps> = ({
  isLoggedIn,
  userProfileServer,
  transactionsTimeTransition,
  setTransactionsTimeTransition,
  setTransactions,
}) => {
  const [period, setPeriod] = useState<Period>({
    startDate: startPeriod(MOMENT.currentMonthYYYMMDD),
    endDate: endPeriod(MOMENT.currentMonthYYYMMDD),
  });

  const [params, setParams] = useState<string>('all');
  
  const decreasePeriod = (date: Period = period) => {
    const newDate: Period = Object.assign({}, {
      startDate: subtractStartPeriod(date.startDate),
      endDate: subtractEndPeriod(date.endDate),
    });
    setPeriod(newDate);
    setTransactionsTimeTransition(newDate);
  };

  const increasePeriod = (date: Period = period) => {
    const newDate: Period = Object.assign({}, {
      startDate: addStartPeriod(date.startDate),
      endDate: addEndPeriod(date.endDate),
    });
    setPeriod(newDate);
    setTransactionsTimeTransition(newDate);
  };

  const currentPeriod = () => {
    const newDate: Period = Object.assign({}, {
      startDate: startPeriod(MOMENT.currentMonthYYYMMDD),
      endDate: endPeriod(MOMENT.currentMonthYYYMMDD),
    });
    setPeriod(newDate);
    setTransactionsTimeTransition(newDate);
  };

  if (isLoggedIn && userProfileServer) {
    if (period !== transactionsTimeTransition) {
      setTransactions(userProfileServer.userId, period, params);
    }
  }

  return (
    <IonPage  id="transactions-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton auto-hide="true"></IonMenuButton>
          </IonButtons>
          <IonTitle className="ion-text-center">Transactions</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <LsTimeTransition
            formatPeriod={`${dateFormatll(period.startDate)} - ${dateFormatll(period.endDate)}`}
            decreasePeriod={decreasePeriod}
            currentPeriod={currentPeriod}
            increasePeriod={increasePeriod} />
        </IonToolbar>
      </IonHeader>
      <LsMainTransactions></LsMainTransactions>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps> ({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
    transactionsTimeTransition: selectorsSessions.getTransactionsTimeTransition(state),
  }),
  mapDispatchToProps: ({
    setTransactionsTimeTransition,
    setTransactions,
  }),
  component: React.memo(TransactionsPage)
});