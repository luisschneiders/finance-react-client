import { isLeapYear, dateFormatM } from '../../util/moment';

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

export const setTransactionsChart = (data: any[]) => {
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

  return {
    Data: {
      labels: incomesOutcomesTransfersLabel,
      datasets: [{
        data: incomesOutcomesTransfers,
        backgroundColor: pieChartColoursBackground,
        borderColor: '#383838',
        hoverBackgroundColor: 'rgb(218,171,85,0.68)',
        borderWidth: 1,
      }],
    },
  };
}

export const setIncomeOutcomeChart = (data: any[]) => {
  const outcome: any[] = data[0];
  const income: any[] = data[1];
  const incomeAndOutcome: any = {
    income: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    outcome: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };
  const barChartLabelsMonths: any[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  let month: number = 0;

  incomeAndOutcome.income.forEach((item: any, index: number) => {
    if (income[index]) {
      month = parseInt(dateFormatM(income[index].transactionDate));
      incomeAndOutcome.income[month - 1] = income[index].TotalIncomeByMonth;
    }
  });

  incomeAndOutcome.outcome.forEach((item: any, index:number) => {
    if (outcome[index]) {
      month = parseInt(dateFormatM(outcome[index].purchaseDate));
      incomeAndOutcome.outcome[month - 1] = outcome[index].TotalAmountByMonth;
    }
  });

  return {
    Data: {
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
    }
  }

}

export const setBanksChart = (data: any[]) => {
  const banksLabel: any[] = [];
  const doughnutBackgroundColors: any[] = [];
  const bank: any = {
    totalCash: 0,
    bankCurrentBalance: {}
  };

  bank.bankCurrentBalance = data.map((value, index) => {
    banksLabel.push(value.bankAccount);
    if (value.bankCurrentBalance >= 0 && value.bankCurrentBalance <= 1000) {
      doughnutBackgroundColors.push('#ff2f92');
    } else if (value.bankCurrentBalance >= 1000 && value.bankCurrentBalance <= 20000) {
      doughnutBackgroundColors.push('#0096ff');
    } else {
      doughnutBackgroundColors.push('#005493');
    }

    return [value.bankCurrentBalance];
  });

  return {
    Data: {
      labels: banksLabel,
      datasets: [{
        data: bank.bankCurrentBalance,
        backgroundColor: doughnutBackgroundColors,
        borderColor: '#383838',
        hoverBackgroundColor: 'rgb(218,171,85,0.68)',
        borderWidth: 1
      }]
    }
  };
}

export const setDailyTransactionsChart = (data: any[]) => {
  const isLeap = isLeapYear(data[1]);
  const days = isLeap === true ? 366 : 365;

  const transactionsData: any = data[0].map((value: any) => {
    return (value.TotalAmountByLabel / days).toFixed(2);
  });

  const transactionsLabel: any = transactionTypeLabel(data[0]);
  const horizontalChartColoursBackground: any = chartColoursBackground(data[0]);

  return {
    Data: {
      labels: transactionsLabel,
      datasets: [{
          label: 'Amount per Day',
          data: transactionsData,
          backgroundColor: horizontalChartColoursBackground,
          borderColor: '#383838',
          hoverBackgroundColor: 'rgb(218,171,85,0.68)',
          borderWidth: 1
      }]
    }
  };
}
