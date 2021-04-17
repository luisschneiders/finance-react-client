import React from 'react';
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { AppPage } from '../../models/AppPage';
import { appTabs } from './AppTabs';
import { connect } from '../../data/connect';

import * as ROUTES from '../../constants/Routes';

import HomePage from '../../pages/home/Home';
import ExpensesPage from '../../pages/expenses/Expenses';
import TransactionsPage from '../../pages/transactions/Transactions';
import NewsDetailsPage from '../../pages/home/NewsDetails';

import BankPage from '../../pages/bank/Bank';
import BankDetailsPage from '../../pages/bank/BankDetails';

import ExpenseTypePage from '../../pages/expense-type/ExpenseType';
import ExpenseTypeDetailsPage from '../../pages/expense-type/ExpenseTypeDetails';

import TransactionTypePage from '../../pages/transaction-type/TransactionType';
import TransactionTypeDetailsPage from '../../pages/transaction-type/TransactionTypeDetails';

import UserTypePage from '../../pages/user/UserType';
import UserTypeDetailsPage from '../../pages/user/UserTypeDetails';

import VehiclePage from '../../pages/vehicle/Vehicle';
import VehicleDetailsPage from '../../pages/vehicle/VehicleDetails';



import SetupPage from '../../pages/setup/Setup';

interface StateProps {
  isAuthenticated: boolean;
}

const LsMainTabs: React.FC<StateProps> = ({isAuthenticated}) => {
  const renderTabItems = (tabs: AppPage[]) => {
    return tabs
      .filter(route => !!route.url)
      .map((tab, index) => (
        <IonTabButton tab={`tab${index+1}`} key={index} href={tab.url}>
          <IonIcon icon={tab.icon} />
          <IonLabel>{tab.label}</IonLabel>
        </IonTabButton>
      ));
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect path={ROUTES.TABS} to={ROUTES.TABS_HOME} exact={true} />
        <Route path={ROUTES.TABS_HOME} render={() => <HomePage />} exact={true} />
        <Route path={ROUTES.TABS_EXPENSES} render={() => <ExpensesPage />} exact={true} />
        <Route path={ROUTES.TABS_TRANSACTIONS} render={() => <TransactionsPage />} exact={true} />
        <Route path={`${ROUTES.TABS_NEWS_DETAILS}/:id`} component={NewsDetailsPage} />

        <Route path={ROUTES.TABS_SETUP} render={() => <SetupPage />} exact={true} />

        <Route path={ROUTES.TABS_BANK} render={() => <BankPage />} exact={true} />
        <Route path={`${ROUTES.TABS_BANK}/:id`} component={BankDetailsPage} exact={true} />

        <Route path={ROUTES.TABS_EXPENSE_TYPE} render={() => <ExpenseTypePage />} exact={true} />
        <Route path={`${ROUTES.TABS_EXPENSE_TYPE}/:id`} component={ExpenseTypeDetailsPage} exact={true} />

        <Route path={ROUTES.TABS_TRANSACTION_TYPE} render={() => <TransactionTypePage />} exact={true} />
        <Route path={`${ROUTES.TABS_TRANSACTION_TYPE}/:id`} component={TransactionTypeDetailsPage} exact={true} />

        <Route path={ROUTES.TABS_USER_TYPE} render={() => <UserTypePage />} exact={true} />
        <Route path={`${ROUTES.TABS_USER_TYPE}/:id`} component={UserTypeDetailsPage} exact={true} />

        <Route path={ROUTES.TABS_VEHICLE} render={() => <VehiclePage />} exact={true} />
        <Route path={`${ROUTES.TABS_VEHICLE}/:id`} component={VehicleDetailsPage} exact={true} />

        <Route path='/' render={() => <Redirect to={ROUTES.TABS_HOME} />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        {isAuthenticated ? renderTabItems(appTabs().authenticated) : renderTabItems(appTabs().unauthenticated)}
      </IonTabBar>
    </IonTabs>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    isAuthenticated: state.userReducer.isLoggedIn,
  }),
  component: LsMainTabs
});
