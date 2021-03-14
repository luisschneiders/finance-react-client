import React, { useEffect, useState } from 'react';
import {
  Redirect,
  Route,
} from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonSpinner
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';

import { 
  getCurrentUser,
  logoutUser
} from './data/api/Firebase';
import { connect } from './data/connect';
import { AppContextProvider } from './app/AppContext';
import {
  setIsLoggedIn,
  setDisplayName,
  setPhotoURL,
  setHasSeenWelcome,
  getDarkMode,
} from './data/user/user.actions';

import LsMainTabs from './components/tabs/MainTabs';
import LsMenu from './components/menu/Menu';
import { toast } from './components/toast/Toast';
import HomeOrWelcome from './components/HomeOrWelcome';

import LoginPage from './pages/login/Login';
import RegisterPage from './pages/register/Register';
import AccountPage from './pages/account/Account';
import WelcomePage from './pages/welcome/Welcome';
import DashboardPage from './pages/dashboard/Dashboard';
import SetupPage from './pages/setup/Setup';
import ExpenseTypePage from './pages/expense-type/ExpenseType';

import { StatusColor } from './enum/StatusColor';
import { getAvatar } from './util/getAvatar';
import * as ROUTES  from './constants/Routes';
import { setResetAppStore } from './data/app/app.actions';
import { initialState } from './data/app/app.state';
import { getUserProfileServer } from './data/sessions/sessions.actions';
import ExpenseTypeDetailsPage from './pages/expense-type/ExpenseTypeDetails';
import TransactionType from './pages/transaction-type/TransactionType';
import TransactionTypeDetailsPage from './pages/transaction-type/TransactionTypeDetails';
import VehiclePage from './pages/vehicle/Vehicle';
import VehicleDetailsPage from './pages/vehicle/VehicleDetails';
// import { setNews } from './data/news/news.actions';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

interface StateProps {
  darkMode: boolean;
}

interface DispatchProps {
  getDarkMode: typeof getDarkMode;
  getUserProfileServer: typeof getUserProfileServer;
  // setNews: typeof setNews;
  setIsLoggedIn: typeof setIsLoggedIn;
  setDisplayName: typeof setDisplayName;
  setPhotoURL: typeof setPhotoURL;
  setResetAppStore: typeof setResetAppStore;
  setHasSeenWelcome: typeof setHasSeenWelcome;
}

interface IonicAppProps extends StateProps, DispatchProps {}

const IonicApp: React.FC<IonicAppProps> = ({
    darkMode,
    getDarkMode,
    getUserProfileServer,
    // setNews,
    setIsLoggedIn,
    setHasSeenWelcome,
    setDisplayName,
    setPhotoURL,
    setResetAppStore,
  }) => {

  const [busy, setBusy] = useState(true);

  useEffect(() => {
    getDarkMode();
    // setNews();
    getCurrentUser().then((user: any) => {
      if (user) {
        getUserProfileServer();
        setIsLoggedIn(true);
        setDisplayName(user.displayName);
        setPhotoURL(user.photoURL ? user.photoURL : getAvatar(user.email));
        setHasSeenWelcome(true);
      } else {
        setIsLoggedIn(false);
      }
      setBusy(false);
    });
  }, [
      getDarkMode,
      getUserProfileServer,
      // setNews,
      setIsLoggedIn,
      setHasSeenWelcome,
      setDisplayName,
      setPhotoURL,
      setResetAppStore,
    ]);

  return (
    <IonApp className={`${darkMode ? 'dark-theme' : ''}`}>
      { busy ? <div className="container-spinner"><IonSpinner></IonSpinner></div> :
              <IonReactRouter>
                <IonSplitPane contentId="main">
                  <LsMenu />
                  <IonRouterOutlet id="main">
                    <Route path='/' component={HomeOrWelcome} exact={true} />
                    <Route path={ROUTES.TABS} component={LsMainTabs} />
                    <Route path={ROUTES.ACCOUNT} component={AccountPage} exact={true} />
                    <Route path={ROUTES.DASHBOARD} component={DashboardPage} exact={true} />
                    <Route path={ROUTES.LOGIN} component={LoginPage} exact={true} />
                    <Route path={ROUTES.REGISTER} component={RegisterPage} exact={true} />
                    <Route path={ROUTES.SETUP} component={SetupPage} exact={true} />
                    <Route path={ROUTES.SETUP_EXPENSE_TYPE} component={ExpenseTypePage} exact={true} />
                    <Route path={`${ROUTES.SETUP_EXPENSE_TYPE}/:id`} component={ExpenseTypeDetailsPage} />
                    <Route path={ROUTES.SETUP_TRANSACTION_TYPE} component={TransactionType} exact={true} />
                    <Route path={`${ROUTES.SETUP_TRANSACTION_TYPE}/:id`} component={TransactionTypeDetailsPage} />
                    <Route path={ROUTES.SETUP_VEHICLE} component={VehiclePage} exact={true} />
                    <Route path={`${ROUTES.SETUP_VEHICLE}/:id`} component={VehicleDetailsPage} />
                    <Route path={ROUTES.WELCOME} component={WelcomePage} exact={true} />
                    <Route path={ROUTES.LOGOUT} render={() => {
                      logoutUser().then(() => {
                        toast('Successfully logged out!', StatusColor.DEFAULT);
                        setIsLoggedIn(false);
                        setResetAppStore(initialState);
                      }, (error) => {
                        toast(error.message, StatusColor.ERROR, 4000);
                      });
                      return <Redirect to={ROUTES.LOGIN} />
                    }} />
                  </IonRouterOutlet>
                </IonSplitPane>
              </IonReactRouter>
      }
    </IonApp>
  )
}

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.userReducer.darkMode,
  }),
  mapDispatchToProps: {
    getDarkMode,
    getUserProfileServer,
    // setNews,
    setIsLoggedIn,
    setHasSeenWelcome,
    setDisplayName,
    setPhotoURL,
    setResetAppStore,
  },
  component: IonicApp
});
