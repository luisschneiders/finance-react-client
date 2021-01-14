import React, { useEffect, useState } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonChip,
  IonLabel,
} from '@ionic/react';
import './AppSummary.scss'
import {Bar, Doughnut, HorizontalBar, Pie} from 'react-chartjs-2';
import { connect } from '../../data/connect';
import {
  setTransactionsChart,
  setIncomeOutcomeChart,
  setBanksChart,
  setDailyTransactionsChart,
} from '../charts/AppCharts';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSummary from '../../data/summary/summary.selectors';
import {
  setAppSummary
} from '../../data/summary/summary.actions';
import { UserProfileServer } from '../../models/UserProfileServer';
import LsTimeTransition from '../../components/time/TimeTransition';
import LsMainCard from '../card/MainCard';
import { StatusColor } from '../../enum/StatusColor';

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
  const [transactionsData, setTransactionsData] = useState<any>();
  const [incomeOutcomeData, setIncomeOutcomeData] = useState<any>();
  const [banksData, setBanksData] = useState<any>();
  const [dailyTransactionsData, setDailyTransactionsData] = useState<any>();

  useEffect(() => {
    if (userProfileServer && (homeTimeTransition > 0)) {
      if (!hasSummary || (currentYear !== homeTimeTransition)) {
        setAppSummary(userProfileServer.userId, homeTimeTransition);
        setHasSummary(true);
        setCurrentYear(homeTimeTransition);
      } else {
        setTransactionsData({ labels: [], datasets: [] });
        setIncomeOutcomeData({ labels: [], datasets: [] });
        setBanksData({ labels: [], datasets: [] });
        setDailyTransactionsData({ labels: [], datasets: [] });
      }

      if (summary && summary.incomesOutcomesTransfers.length > 0) {
        const pieChart: any = setTransactionsChart(summary.incomesOutcomesTransfers);
        if (pieChart && pieChart.Data) {
          setTransactionsData(pieChart.Data);
        }
      }
      if (summary && (summary.purchases.length > 0 || summary.transactions.length > 0)) {
        const barChart: any = setIncomeOutcomeChart([summary.purchases, summary.transactions]);
        if (barChart.Data) {
          setIncomeOutcomeData(barChart.Data);
        }
      }
      if (summary && summary.banks.length > 0) {
        const doughnutChart: any = setBanksChart(summary.banks);
        if (doughnutChart && doughnutChart.Data) {
          setBanksData(doughnutChart.Data);
        }
      }
      if (summary && summary.incomesOutcomesTransfers.length > 0) {
        const horizontalBarChart: any = setDailyTransactionsChart([summary.incomesOutcomesTransfers, homeTimeTransition]);
        if (horizontalBarChart && horizontalBarChart.Data) {
          setDailyTransactionsData(horizontalBarChart.Data);
        }
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
    <IonGrid id="app-summary">
      <LsTimeTransition />
      <IonRow className="min-height min-height--300">
        <IonCol size="12" size-sm="6">
          <IonChip color="primary">
            <IonLabel>Transactions</IonLabel>
          </IonChip>
          { transactionsData && transactionsData.datasets.length > 0 ?
            <Pie data={transactionsData} options={{ maintainAspectRatio: true, legend: { position: 'left' } }}/> :
            <LsMainCard color={StatusColor.WARNING} message='No data available'/>}
        </IonCol>
        <IonCol size="12" size-sm="6">
          <IonChip color="tertiary">
            <IonLabel>Incomes / Outcomes</IonLabel>
          </IonChip>
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
      <IonRow className="min-height min-height--300">
        <IonCol size="12" size-sm="6">
          <IonChip color="success">
            <IonLabel>Day by day</IonLabel>
          </IonChip>
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
{/* Refactor IonChip */}
          <IonChip color="secondary">
            <IonLabel>Banks</IonLabel>
          </IonChip>
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
    userProfileServer: selectorsUser.getUserProfileServer(state),
    homeTimeTransition: selectorsUser.getHomeTimeTransition(state),
    summary: selectorsSummary.getSummary(state),
  }),
  mapDispatchToProps: ({
    setAppSummary,
  }),
  component: React.memo(LsAppSummary)
});
