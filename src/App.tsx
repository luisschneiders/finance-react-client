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

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Account from './pages/account/Account';
import Welcome from './pages/welcome/Welcome';

import { ToastStatus } from './enum/ToastStatus';
import { getAvatar } from './util/getAvatar';
import * as ROUTES  from './constants/Routes';
import Dashboard from './pages/dashboard/Dashboard';
import { setAppClearStore } from './data/app/app.actions';

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
  setIsLoggedIn: typeof setIsLoggedIn;
  setDisplayName: typeof setDisplayName;
  setPhotoURL: typeof setPhotoURL;
  setAppClearStore: typeof setAppClearStore;
  setHasSeenWelcome: typeof setHasSeenWelcome;
}

interface IonicAppProps extends StateProps, DispatchProps {}

const IonicApp: React.FC<IonicAppProps> = ({
    darkMode,
    getDarkMode,
    setIsLoggedIn,
    setHasSeenWelcome,
    setDisplayName,
    setPhotoURL,
    setAppClearStore,
  }) => {

  const [busy, setBusy] = useState(true);

  useEffect(() => {
    getDarkMode();
    getCurrentUser().then((user: any) => {
      
      if (user) {
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
      setIsLoggedIn,
      setHasSeenWelcome,
      setDisplayName,
      setPhotoURL,
      setAppClearStore,
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
                    <Route path={ROUTES.ACCOUNT} component={Account} exact={true} />
                    <Route path={ROUTES.DASHBOARD} component={Dashboard} exact={true} />
                    <Route path={ROUTES.LOGIN} component={Login} exact={true} />
                    <Route path={ROUTES.REGISTER} component={Register} exact={true} />
                    <Route path={ROUTES.WELCOME} component={Welcome} exact={true} />
                    <Route path={ROUTES.LOGOUT} render={() => {
                      logoutUser().then(() => {
                        toast('Successfully logged out!', ToastStatus.DEFAULT);
                        setIsLoggedIn(false);
                        // setAppClearStore();
                      }, (error) => {
                        toast(error.message, ToastStatus.ERROR, 4000);
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
    setIsLoggedIn,
    setHasSeenWelcome,
    setDisplayName,
    setPhotoURL,
    setAppClearStore,
  },
  component: IonicApp
});
