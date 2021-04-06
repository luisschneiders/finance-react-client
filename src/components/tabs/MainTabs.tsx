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
import NewsDetailsPage from '../../pages/home/NewsDetails';
import ExpensesPage from '../../pages/expenses/Expenses';
import TransactionsPage from '../../pages/transactions/Transactions';

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
