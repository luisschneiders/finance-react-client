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
import Home from '../../pages/home/Home';
import NewsDetails from '../../pages/home/NewsDetails';

interface StateProps {
  isAuthenticated: boolean;
}

const LsMainTabs: React.FC<StateProps> = ({isAuthenticated}) => {
  function renderTabItems(tabs: AppPage[]) {
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
        <Route path={ROUTES.TABS_HOME} render={() => <Home></Home>} exact={true} />
        {/* <Route path={ROUTES.TAB2} render={() => <Tab2></Tab2>} exact={true} /> */}
        <Route path={`${ROUTES.TABS_NEWS_DETAILS}/:id`} component={NewsDetails} />
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
