import React, { useEffect, useState } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import { connect } from '../../data/connect';
import {
  renderIncomesOutcomesTransfers,
  renderBanks,
  renderIncomesOutcomes,
  renderDailyTransactions,
} from '../charts/AppCharts';
import LsMainCharts from '../charts/MainCharts';
import * as HTML_ELEMENTS from '../../constants/HTMLElements';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSummary from '../../data/summary/summary.selectors';
import {
  setAppSummary
} from '../../data/summary/summary.actions';
import { UserProfileServer } from '../../models/UserProfileServer';
import LsTimeTransition from '../../components/time/TimeTransition';

interface StateProps {
  userProfileServer: UserProfileServer;
  homeTimeTransition: number;
  summary: any;
}
interface DispatchProps {
  setAppSummary: typeof setAppSummary;
}

interface AppSummaryProps extends StateProps, DispatchProps {}

const LsAppSummary: React.FC<AppSummaryProps> = ({
    userProfileServer,
    homeTimeTransition,
    summary,
    setAppSummary
  }) => {

  const [hasSummary, setHasSummary] = useState<boolean>(false);
  const [currentYear, setCurrentYear] = useState<number>(0);

  useEffect(() => {
    if (userProfileServer && (homeTimeTransition > 0)) {
      if (!hasSummary || (currentYear !== homeTimeTransition)) {
        setAppSummary(userProfileServer.userId, homeTimeTransition);
        setHasSummary(true);
        setCurrentYear(homeTimeTransition);
      }
    }
  }, [
    userProfileServer,
    homeTimeTransition,
    summary,
    setAppSummary,
    currentYear,
    hasSummary,
  ]);

  return (
    <IonGrid>
      <LsTimeTransition />
      <IonRow>
        <IonCol size="12" size-sm="6">
          {summary && summary.incomesOutcomesTransfers.length > 0 ?
          <LsMainCharts func={renderIncomesOutcomesTransfers}
                        data={summary.incomesOutcomesTransfers}
                        id={HTML_ELEMENTS.INCOMES_OUTCOMES_TRANSFERS_CHART}
                        label="Transactions"
                        color="primary"></LsMainCharts> :
          <IonCard color="warning">
            <IonCardContent className="ion-text-center">
              <h3>No data available!</h3>
            </IonCardContent>
          </IonCard>}
        </IonCol>
        <IonCol size="12" size-sm="6">
          {summary && (summary.purchases.length > 0 || summary.transactions.length > 0) ?
          <LsMainCharts func={renderIncomesOutcomes}
                        data={[summary.purchases, summary.transactions]}
                        id={HTML_ELEMENTS.INCOMES_OUTCOMES_CHART}
                        label="Incomes / Outcomes"
                        color="tertiary"></LsMainCharts> :
          <IonCard color="warning">
            <IonCardContent className="ion-text-center">
              <h3>No data available!</h3>
            </IonCardContent>
          </IonCard>}
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12" size-sm="6">
          {summary && summary.incomesOutcomesTransfers.length > 0 ?
          <LsMainCharts func={renderDailyTransactions}
                        data={[summary.incomesOutcomesTransfers, homeTimeTransition]}
                        id={HTML_ELEMENTS.DAILY_TRANSACTIONS}
                        label="Day by day"
                        color="success"></LsMainCharts> :
          <IonCard color="warning">
            <IonCardContent className="ion-text-center">
              <h3>No data available!</h3>
            </IonCardContent>
          </IonCard>}
        </IonCol>
        <IonCol size="12" size-sm="6">
          {summary && summary.banks.length > 0 ?
          <LsMainCharts func={renderBanks}
                        data={summary.banks}
                        id={HTML_ELEMENTS.BANKS_CHART}
                        label="Banks"
                        color="secondary"></LsMainCharts> :
          <IonCard color="warning">
            <IonCardContent className="ion-text-center">
              <h3>No data available!</h3>
            </IonCardContent>
          </IonCard>}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default connect<{}, StateProps, DispatchProps> ({
  mapStateToProps: (state) => ({
    userProfileServer: selectorsUser.getUserProfileServer(state),
    homeTimeTransition: selectorsUser.getHomeTimeTransition(state),
    summary: selectorsSummary.getSummary(state),
  }),
  mapDispatchToProps: ({
    setAppSummary,
  }),
  component: React.memo(LsAppSummary)
});
