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
import { registerUser } from '../../data/api/Firebase';
import { ToastStatus } from '../../enum/ToastStatus';
import {
  setIsLoggedIn,
  setPhotoURL
} from '../../data/user/user.actions';
import { connect } from '../../data/connect';
import { getAvatar } from '../../util/getAvatar';
import * as ROUTES from '../../constants/Routes';
import * as MOMENT  from '../../util/moment';

interface OwnProps extends RouteComponentProps {}
interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setPhotoURL: typeof setPhotoURL;
}
interface RegisterProps extends OwnProps, DispatchProps { }

const Register: React.FC<RegisterProps> = ({
    setIsLoggedIn,
    history,
    setPhotoURL: setPhotoURLAction
  }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [busy , setBusy] = useState(false);

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast('Passwords should match!', ToastStatus.WARNING);
    }

    if (email.trim() === '' || password.trim() === '') {
      return toast('Email and password are required!', ToastStatus.WARNING);
    }

    setBusy(true);
    const response: any = await registerUser(email, password);
    setBusy(false);

    if (response) {
      // Go to dashboard...
      await setIsLoggedIn(true);
      await setPhotoURLAction(getAvatar(response?.user?.email));
      history.push(ROUTES.TABS_HOME, {direction: 'none'});
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
            <IonItem>
              <IonLabel position="stacked" color="primary">Confirm Password</IonLabel>
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
  },
  component: Register
});
