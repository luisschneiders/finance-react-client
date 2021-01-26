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
import { StatusColor } from '../../enum/StatusColor';
import {
  setIsLoggedIn,
  setDisplayName,
  setPhotoURL,
} from '../../data/user/user.actions';
import { connect } from '../../data/connect';
import { getAvatar } from '../../util/getAvatar';
import * as ROUTES from '../../constants/Routes';
import { setMenuEnabled, setUserProfileServer } from '../../data/sessions/sessions.actions';
import { getUserCredentialsServer } from '../../data/api/User';
import { AppColor } from '../../enum/AppColor';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setUserProfileServer: typeof setUserProfileServer;
  setIsLoggedIn: typeof setIsLoggedIn;
  setDisplayName: typeof setDisplayName;
  setPhotoURL: typeof setPhotoURL;
  setMenuEnabled: typeof setMenuEnabled;
}

interface LoginProps extends OwnProps, DispatchProps {}

const LoginPage: React.FC<LoginProps> = ({
    setUserProfileServer,
    setIsLoggedIn,
    history,
    setDisplayName: setDisplayNameAction,
    setPhotoURL: setPhotoURLAction,
    setMenuEnabled,
  }) => {

  useIonViewWillEnter(() => {
    setMenuEnabled(true);
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      return toast('Email and password are required!', StatusColor.WARNING);
    }

    setBusy(true);
    const response: any = await loginUser(email, password);
    setBusy(false);

    if (response) {
      // Go to dashboard...
      const userProfile: any = await getUserCredentialsServer({email, password});

      // Check if credentials in the server match. If not, logout from Firebase
      if (userProfile) {

        await setUserProfileServer(userProfile);
        await setIsLoggedIn(true);
        await setDisplayNameAction(response.user.displayName ? response.user.displayName : null);
        await setPhotoURLAction(response.user.photoURL ? response.user.photoURL : getAvatar(response.user.email));

        history.push(ROUTES.TABS_HOME, {direction: 'none'});

      } else {
        logoutUser().then(() => {
          setIsLoggedIn(false);
        }, (error) => {
          toast(error.message, StatusColor.ERROR, 4000);
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
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Email</IonLabel>
              <IonInput name="email" type="email"
                        value={email} spellCheck={false} autocapitalize="off"
                        onIonChange={(e: any) => setEmail(e.detail.value!)} required>
              </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Password</IonLabel>
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
              <IonButton routerLink={ROUTES.REGISTER} fill="clear" expand="block" color={AppColor.DARK}>Register</IonButton>
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
  },
  component: LoginPage
});
