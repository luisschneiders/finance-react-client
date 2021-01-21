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
import * as selectorsSummary from '../../data/summary/summary.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import {
  setAppSummary
} from '../../data/summary/summary.actions';
import { UserProfileServer } from '../../models/UserProfileServer';
import LsMainCard from '../card/MainCard';
import { StatusColor } from '../../enum/StatusColor';
import LsMainChip from '../chip/MainChip';
import { AppColor } from '../../enum/AppColor';
import { setHomeTimeTransition } from '../../data/sessions/sessions.actions';
import * as MOMENT  from '../../util/moment';
import { dateFormatYYYY } from '../../util/moment';
import LsTimeTransition from '../time/TimeTransition';

interface StateProps {
  userProfileServer: UserProfileServer;
  homeTimeTransition: string;
  summary: any;
}
interface DispatchProps {
  setHomeTimeTransition: typeof setHomeTimeTransition;
  setAppSummary: typeof setAppSummary;
}

interface AppSummaryProps extends StateProps, DispatchProps {}

const LsAppSummary: React.FC<AppSummaryProps> = ({
    userProfileServer,
    homeTimeTransition,
    summary,
    setAppSummary,
    setHomeTimeTransition
  }) => {

  const [currentYear, setCurrentYear] = useState<string>('0');
  const [hasSummary, setHasSummary] = useState<boolean>(false);
  const [transactionsData, setTransactionsData] = useState<any>();
  const [incomeOutcomeData, setIncomeOutcomeData] = useState<any>();
  const [banksData, setBanksData] = useState<any>();
  const [dailyTransactionsData, setDailyTransactionsData] = useState<any>();

  const [period, setPeriod] = useState<string>(MOMENT.currentYearYYYY);
  const [periodFormat, setPeriodFormat] = useState<string>(dateFormatYYYY(MOMENT.currentYearYYYY));

  useEffect(() => {
    if (userProfileServer) {
      if (!hasSummary || (parseInt(currentYear) !== parseInt(homeTimeTransition))) {
        setAppSummary(userProfileServer.userId, parseInt(period));
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
    hasSummary,
    currentYear,
    period
  ]);

  const decreasePeriod = (date: string = period) => {
    let newDate: number = parseInt(date);
    --newDate;
    setPeriod(newDate.toString());
    setPeriodFormat(dateFormatYYYY(newDate.toString()));
    setHomeTimeTransition(newDate.toString());
  };

  const increasePeriod = (date: string = period) => {
    let newDate: number = parseInt(date);
    ++newDate;
    setPeriod(newDate.toString());
    setPeriodFormat(dateFormatYYYY(newDate.toString()));
    setHomeTimeTransition(newDate.toString());
  };

  const currentPeriod = () => {
    setPeriod(MOMENT.currentYearYYYY);
    setPeriodFormat(dateFormatYYYY(MOMENT.currentYearYYYY));
    setHomeTimeTransition(MOMENT.currentYearYYYY);
  };

  return (
    <IonGrid id="app-summary" className="ion-padding-top">
      <LsTimeTransition
          formatPeriod={`${periodFormat}`}
          decreasePeriod={decreasePeriod}
          currentPeriod={currentPeriod}
          increasePeriod={increasePeriod} />
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
    userProfileServer: selectorsSessions.getUserProfileServer(state),
    homeTimeTransition: selectorsSessions.getHomeTimeTransition(state),
    summary: selectorsSummary.getSummary(state),
  }),
  mapDispatchToProps: ({
    setHomeTimeTransition,
    setAppSummary,
  }),
  component: React.memo(LsAppSummary)
});
