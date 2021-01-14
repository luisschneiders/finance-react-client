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
  IonCol
} from '@ionic/react';
import {
  Link,
  RouteComponentProps
} from 'react-router-dom';
import { toast } from '../../components/toast/Toast';
import { logoutUser, registerUser } from '../../data/api/Firebase';
import { StatusColor } from '../../enum/StatusColor';
import {
  setIsLoggedIn,
  setPhotoURL,
  setUserProfileServer
} from '../../data/user/user.actions';
import { connect } from '../../data/connect';
import { getAvatar } from '../../util/getAvatar';
import * as ROUTES from '../../constants/Routes';
import { setUserCredentialsServer } from '../../data/api/User';
import { AppColor } from '../../enum/AppColor';

interface OwnProps extends RouteComponentProps {}
interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setPhotoURL: typeof setPhotoURL;
  setUserProfileServer: typeof setUserProfileServer;
}
interface RegisterProps extends OwnProps, DispatchProps { }

const Register: React.FC<RegisterProps> = ({
    setIsLoggedIn,
    history,
    setPhotoURL: setPhotoURLAction,
    setUserProfileServer,
  }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [busy , setBusy] = useState(false);

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast('Passwords should match!', StatusColor.WARNING);
    }

    if (email.trim() === '' || password.trim() === '') {
      return toast('Email and password are required!', StatusColor.WARNING);
    }

    setBusy(true);
    const response: any = await registerUser(email, password);
    setBusy(false);

    if (response) {
      // Go to dashboard...
      const userProfile: any = await setUserCredentialsServer({email, password});

      if (userProfile) {
        await setUserProfileServer(userProfile);
        await setIsLoggedIn(true);
        await setPhotoURLAction(getAvatar(response?.user?.email));
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
    <IonPage id="register-page">
      <IonHeader class="ion-text-center">
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={busy}></IonLoading>
      <IonContent className="ion-padding">
        <div className="login-logo">
          <img src="assets/img/slide2.svg" alt="Logo"/>
        </div>
        <form noValidate onSubmit={register}>
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
            <IonItem>
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Confirm Password</IonLabel>
              <IonInput name="password" type="password"
                        value={confirmPassword}
                        onIonChange={(e: any) => setConfirmPassword(e.detail.value!)} required>
              </IonInput>
            </IonItem>
          </IonList>

          <IonRow className="ion-padding-top">
            <IonCol>
              <IonButton type="submit" fill="outline" expand="block">Register</IonButton>
            </IonCol>
            <IonCol>
              <div >Already have an account? <Link to={ROUTES.LOGIN}>Login</Link></div>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setPhotoURL,
    setUserProfileServer,
  },
  component: Register
});
