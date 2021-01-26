import React, { useEffect, useState } from 'react';
import './Expenses.scss';
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
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

  useEffect(() => {

    if (isLoggedIn && userProfileServer) {
      if (period !== expensesTimeTransition) {
        setExpenses(userProfileServer.userId, period, params);
      }
    }

  },[
    period,
    params,
    isLoggedIn,
    userProfileServer,
    expensesTimeTransition,
    setExpenses,
  ]);

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

  return (
    <IonPage id="expenses-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton auto-hide="true"></IonMenuButton>
          </IonButtons>
          <IonTitle>Expenses</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <LsTimeTransition
            formatPeriod={`${dateFormatll(period.startDate)} - ${dateFormatll(period.endDate)}`}
            decreasePeriod={decreasePeriod}
            currentPeriod={currentPeriod}
            increasePeriod={increasePeriod} />
        </IonToolbar>
      </IonHeader>
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
