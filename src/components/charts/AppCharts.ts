import Chart from 'chart.js';
import * as HTML_ELEMENTS from '../../constants/HTMLElements';

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

  const incomesOutcomesTransfersLabel: any = data.map((value) => {
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

  const pieChartColoursBackground = data.map((value) => {
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
