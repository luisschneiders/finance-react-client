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
import Tab1 from '../../pages/tab1/Tab1';
import Tab2 from '../../pages/tab2/Tab2';
import Tab3 from '../../pages/tab3/Tab3';
import { AppPage } from '../../models/AppPage';
import { appTabs } from './AppTabs';
import { connect } from '../../data/connect';
import * as ROUTES from '../../constants/Routes';
import Tab1Detail from '../../pages/tab1/Tab1Detail';

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
        <Redirect path={ROUTES.TABS} to={ROUTES.TABS_MAIN} exact={true} />
        <Route path={ROUTES.TABS_TRANSACTIONS} render={() => <Tab1></Tab1>} exact={true} />
        <Route path={ROUTES.TABS_EXPENSES} render={() => <Tab2></Tab2>} exact={true} />
        {/* <Route path={`${ROUTES.TAB1}/:id`} component={Tab1Detail} /> */}
        <Route path='/' render={() => <Redirect to={ROUTES.HOME} />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        {isAuthenticated ? renderTabItems(appTabs().authenticated) : renderTabItems(appTabs().unauthenticated)}
      </IonTabBar>
    </IonTabs>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    isAuthenticated: state.userReducer.isLoggedin,
  }),
  component: LsMainTabs
});
