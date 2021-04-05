import React, { useEffect, useState } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import './AppSummary.scss'
import {
  Bar,
  Doughnut,
  HorizontalBar,
  Pie
} from 'react-chartjs-2';
import { connect } from '../../data/connect';
import {
  setTransactionsChart,
  setIncomeOutcomeChart,
  setBanksChart,
  setDailyTransactionsChart,
} from '../charts/AppCharts';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSummary from '../../data/summary/summary.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import { UserProfileServer } from '../../models/UserProfileServer';
import LsMainCard from '../card/MainCard';
import { StatusColor } from '../../enum/StatusColor';
import LsMainChip from '../chip/MainChip';
import { AppColor } from '../../enum/AppColor';
import { dateFormatYYYY } from '../../util/moment';

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
  summary: any;
}
interface DispatchProps {}

interface AppSummaryProps extends StateProps, DispatchProps {}

const LsAppSummary: React.FC<AppSummaryProps> = ({
  isLoggedIn,
  userProfileServer,
  summary,
  }) => {

  const [transactionsData, setTransactionsData] = useState<any>();
  const [incomeOutcomeData, setIncomeOutcomeData] = useState<any>();
  const [banksData, setBanksData] = useState<any>();
  const [dailyTransactionsData, setDailyTransactionsData] = useState<any>();

  useEffect(() => {

    if (isLoggedIn && userProfileServer) {

      if (summary && summary.incomesOutcomesTransfers.length > 0) {
        const pieChart: any = setTransactionsChart(summary.incomesOutcomesTransfers);
        if (pieChart && pieChart.Data) {
          setTransactionsData(pieChart.Data);
        }
      } else {
        setTransactionsData({ labels: [], datasets: [] });
      }

      if (summary && (summary.purchases.length > 0 || summary.transactions.length > 0)) {
        const barChart: any = setIncomeOutcomeChart([summary.purchases, summary.transactions]);
        if (barChart.Data) {
          setIncomeOutcomeData(barChart.Data);
        }
      } else {
        setIncomeOutcomeData({ labels: [], datasets: [] });
      }

      if (summary && summary.banks.length > 0) {
        const doughnutChart: any = setBanksChart(summary.banks);
        if (doughnutChart && doughnutChart.Data) {
          setBanksData(doughnutChart.Data);
        }
      } else {
        setBanksData({ labels: [], datasets: [] });
      }

      if (summary && summary.incomesOutcomesTransfers.length > 0) {
        const horizontalBarChart: any = setDailyTransactionsChart(
          summary.incomesOutcomesTransfers,
          // Get the year selected from any transaction type.
          // E.g.: Income, Outcome or Transfer
          dateFormatYYYY(summary.incomesOutcomesTransfers[0].transactionDate ||
                         summary.incomesOutcomesTransfers[1].transactionDate ||
                         summary.incomesOutcomesTransfers[3].transactionDate ));
        if (horizontalBarChart && horizontalBarChart.Data) {
          setDailyTransactionsData(horizontalBarChart.Data);
        }
      } else {
        setDailyTransactionsData({ labels: [], datasets: [] });
      }
    }

  }, [
    isLoggedIn,
    userProfileServer,
    summary,
  ]);

  return (
    <IonGrid id="app-summary" className="ion-padding-top">
      <IonRow className="min-height min-height--330">
        <IonCol size="12" size-sm="6">
          <LsMainChip color={AppColor.PRIMARY} text='Transactions' />
          { transactionsData && transactionsData.datasets.length > 0 ?
            <Pie data={transactionsData} options={{ maintainAspectRatio: true, legend: { position: 'left' } }}/> :
            <LsMainCard color={StatusColor.WARNING} message='No data available'/>}
        </IonCol>
        <IonCol size="12" size-sm="6">
          <LsMainChip color={AppColor.TERTIARY} text='Incomes / Outcomes' />
          { incomeOutcomeData && incomeOutcomeData.datasets.length > 0 ?
            <Bar data={incomeOutcomeData}
              options={{
              maintainAspectRatio: true,
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              },
            }
          }/> :
          <LsMainCard color={StatusColor.WARNING} message='No data available'/>}
        </IonCol>
      </IonRow>
      <IonRow className="min-height min-height--330">
        <IonCol size="12" size-sm="6">
          <LsMainChip color={AppColor.SUCCESS} text='Day by day' />
          { dailyTransactionsData && dailyTransactionsData.datasets.length > 0 ?
            <HorizontalBar data={dailyTransactionsData}
              options={{
                maintainAspectRatio: true,
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: true
                    }
                  }]
                },
                legend: { position: 'left' }
              }}/> :
            <LsMainCard color={StatusColor.WARNING} message='No data available'/>}
        </IonCol>
        <IonCol size="12" size-sm="6" >
          <LsMainChip color={AppColor.SECONDARY} text='Banks' />
          { banksData && banksData.datasets.length > 0 ?
            <Doughnut data={banksData} options={{ maintainAspectRatio: true, legend: { position: 'left' } }}/> :
            <LsMainCard color={StatusColor.WARNING} message='No data available'/>}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default connect<{}, StateProps, DispatchProps> ({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
    summary: selectorsSummary.getSummary(state),
  }),
  mapDispatchToProps: ({}),
  component: React.memo(LsAppSummary)
});
