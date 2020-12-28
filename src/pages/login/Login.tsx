import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonLoading,
  IonList,
  IonItem,
  IonLabel,
  IonRow,
  IonCol,
  useIonViewWillEnter
} from '@ionic/react';
import './Login.scss';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from '../../components/toast/Toast';
import { loginUser, logoutUser } from '../../data/api/Firebase';
import { ToastStatus } from '../../enum/ToastStatus';
import {
  setIsLoggedIn,
  setDisplayName,
  setPhotoURL,
  setUserProfileServer
} from '../../data/user/user.actions';
import { connect } from '../../data/connect';
import { getAvatar } from '../../util/getAvatar';
import * as ROUTES from '../../constants/Routes';
import * as MOMENT  from '../../util/moment';
import { setMenuEnabled } from '../../data/sessions/sessions.actions';
import { getUserCredentialsServer } from '../../data/api/User';
import { getAppSummary } from '../../data/summary/summary.actions';

interface OwnProps extends RouteComponentProps {}
interface DispatchProps {
  setUserProfileServer: typeof setUserProfileServer;
  setIsLoggedIn: typeof setIsLoggedIn;
  setDisplayName: typeof setDisplayName;
  setPhotoURL: typeof setPhotoURL;
  setMenuEnabled: typeof setMenuEnabled;
  getAppSummary: typeof getAppSummary;
}
interface LoginProps extends OwnProps, DispatchProps { }

const Login: React.FC<LoginProps> = ({
    setUserProfileServer,
    setIsLoggedIn,
    history,
    setDisplayName: setDisplayNameAction,
    setPhotoURL: setPhotoURLAction,
    setMenuEnabled,
    getAppSummary
  }) => {

  useIonViewWillEnter(() => {
    setMenuEnabled(true);
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [currentYear, setCurrentYear] = useState(Number);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      return toast('Email and password are required!', ToastStatus.WARNING);
    }

    setCurrentYear(parseInt(MOMENT.currentYear));

    setBusy(true);
    const response: any = await loginUser(email, password);
    setBusy(false);

    if (response) {
      // Go to dashboard...
      const userProfile: any = await getUserCredentialsServer({email, password});

      // Check if credentials in the server match. If not, logout from Firebase
      if (userProfile) {
        await getAppSummary(userProfile.userId, currentYear);
        await setUserProfileServer(userProfile);
        await setIsLoggedIn(true);
        await setDisplayNameAction(response.user.displayName ? response.user.displayName : null);
        await setPhotoURLAction(response.user.photoURL ? response.user.photoURL : getAvatar(response.user.email));

        history.push(`${ROUTES.TABS_HOME}/${currentYear}`, {direction: 'none'});

      } else {
        logoutUser().then(() => {
          setIsLoggedIn(false);
        }, (error) => {
          toast(error.message, ToastStatus.ERROR, 4000);
        });
      }
    }
  }

  return (
    <IonPage id="login-page">
      <IonHeader class="ion-text-center">
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={busy}></IonLoading>
      <IonContent className="ion-padding">
        <div className="login-logo">
          <img src="assets/img/slide1.svg" alt="Logo"/>
        </div>
        <form noValidate onSubmit={login}>
          <IonList lines="full">
            <IonItem>
              <IonLabel position="stacked" color="primary">Email</IonLabel>
              <IonInput name="email" type="email"
                        value={email} spellCheck={false} autocapitalize="off"
                        onIonChange={(e: any) => setEmail(e.detail.value!)} required>
              </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password"
                        value={password}
                        onIonChange={(e: any) => setPassword(e.detail.value!)} required>
              </IonInput>
            </IonItem>
          </IonList>
          <IonRow className="ion-padding-top">
            <IonCol>
              <IonButton type="submit" fill="outline" expand="block">Login</IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink={ROUTES.REGISTER} fill="clear" expand="block" color="dark">Register</IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setUserProfileServer,
    setIsLoggedIn,
    setDisplayName,
    setPhotoURL,
    setMenuEnabled,
    getAppSummary,
  },
  component: Login
});
