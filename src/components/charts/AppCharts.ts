import Chart from 'chart.js';
import * as HTML_ELEMENTS from '../../constants/HTMLElements';
import { isLeapYear, monthFormatM } from '../../util/moment';

const transactionTypeLabel = (data: any[]) => {
  return data.map((value) => {
    switch(value.transactionLabel) {
      case 'C':
        value.label = 'Incomes';
        break;
      case 'D':
        value.label = 'Outcomes';
        break;
      case 'T':
        value.label = 'Transfers';
        break;
      default:
        value.label = 'Label';
    }
    return [value.label];
  });
};

const chartColoursBackground = (data: any[]) => {
  return data.map((value) => {
    switch(value.transactionLabel) {
      case 'C':
        value.pieChartColoursBackground = '#005493';
        break;
      case 'D':
        value.pieChartColoursBackground = '#ff2f92';
        break;
      case 'T':
        value.pieChartColoursBackground = '#0096ff';
        break;
      default:
        value.pieChartColoursBackground = '#99D6EA';

    }
    return [value.pieChartColoursBackground];
  });
}

export const renderIncomesOutcomesTransfers = (data: any[]) => {
  const ctx: any = document.getElementById(HTML_ELEMENTS.INCOMES_OUTCOMES_TRANSFERS_CHART);
  const incomesOutcomesTransfers: any = data.map((value) => {
    switch(value.transactionLabel) {
      case 'T':
        value.TotalAmountByLabel = (value.TotalAmountByLabel / 2).toFixed(2);
        break;
    }
    return [value.TotalAmountByLabel];
  });

  const incomesOutcomesTransfersLabel: any = transactionTypeLabel(data);
  const pieChartColoursBackground: any = chartColoursBackground(data);

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: incomesOutcomesTransfersLabel,
      datasets: [{
        data: incomesOutcomesTransfers,
        backgroundColor: pieChartColoursBackground,
        borderColor: '#383838',
        hoverBackgroundColor: 'rgb(218,171,85,0.68)',
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        position: 'left'
      }
    }
  });
}

export const renderBanks = (data: any[]) => {
  const banksLabel: any[] = [];
  const doughnutBackgroundColors: any[] = [];
  const bank: any = {
    totalCash: 0,
    bankCurrentBalance: {}
  };
  const ctx: any = document.getElementById(HTML_ELEMENTS.BANKS_CHART);

  let totalCash: any = 0;

  bank.bankCurrentBalance = data.map((value, index) => {
    banksLabel.push(value.bankAccount);
    if (value.bankCurrentBalance >= 0 && value.bankCurrentBalance <= 1000) {
      doughnutBackgroundColors.push('#ff2f92');
    } else if (value.bankCurrentBalance >= 1000 && value.bankCurrentBalance <= 20000) {
      doughnutBackgroundColors.push('#0096ff');
    } else {
      doughnutBackgroundColors.push('#005493');
    }

    totalCash += value.bankCurrentBalance;
    return [value.bankCurrentBalance];
  });

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: banksLabel,
      datasets: [{
        data: bank.bankCurrentBalance,
        backgroundColor: doughnutBackgroundColors,
        borderColor: '#383838',
        hoverBackgroundColor: 'rgb(218,171,85,0.68)',
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        position: 'left'
      }
    }
  });
}

export const renderIncomesOutcomes = (data: any[]) => {
  const ctx: any = document.getElementById(HTML_ELEMENTS.INCOMES_OUTCOMES_CHART);
  
  const outcome: any[] = data[0];
  const income: any[] = data[1];
  const incomeAndOutcome: any = {
    income: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    outcome: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  const barChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  const barChartLabelsMonths: any[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  let month: number = 0;

  incomeAndOutcome.income.forEach((item: any, index: number) => {
    if (income[index]) {
      month = parseInt(monthFormatM(income[index].transactionDate));
      incomeAndOutcome.income[month - 1] = income[index].TotalIncomeByMonth;
    }
  });

  incomeAndOutcome.outcome.forEach((item: any, index:number) => {
    if (outcome[index]) {
      month = parseInt(monthFormatM(outcome[index].purchaseDate));
      incomeAndOutcome.outcome[month - 1] = outcome[index].TotalAmountByMonth;
    }
  });

  new Chart(ctx, {
    type: 'bar',
    data: {
        labels: barChartLabelsMonths,
        datasets: [{
          label: 'Incomes',
          data: incomeAndOutcome.income,
          backgroundColor: '#005493',
          borderColor: '#383838',
          hoverBackgroundColor: 'rgb(218,171,85,0.68)',
          borderWidth: 1
        },
        {
          label: 'Outcomes',
          data: incomeAndOutcome.outcome,
          backgroundColor: '#ff2f92',
          borderColor: '#383838',
          hoverBackgroundColor: 'rgb(218,171,85,0.68)',
          borderWidth: 1
        }]
    },
    options: barChartOptions
  });
}

export const renderDailyTransactions = (data: any[]) => {
  const ctx: any = document.getElementById(HTML_ELEMENTS.DAILY_TRANSACTIONS);
  const horizontalBarChartOptions: any = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      position: 'left'
    }
  };

  const isLeap = isLeapYear(data[1]);
  const days = isLeap === true ? 366 : 365;

  const transactionsData: any = data[0].map((value: any) => {
    return (value.TotalAmountByLabel / days).toFixed(2);
  });

  const transactionsLabel: any = transactionTypeLabel(data[0]);
  const horizontalChartColoursBackground: any = chartColoursBackground(data[0]);

  new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: transactionsLabel,
        datasets: [{
            label: 'Amount per Day',
            data: transactionsData,
            backgroundColor: horizontalChartColoursBackground,
            borderColor: '#383838',
            hoverBackgroundColor: 'rgb(218,171,85,0.68)',
            borderWidth: 1
        }]
    },
    options: horizontalBarChartOptions
  });
}
