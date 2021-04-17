import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import {
  businessOutline,
  carOutline,
  peopleOutline,
  pricetagOutline,
  repeatOutline
} from 'ionicons/icons';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from '../../data/connect';
import * as ROUTES from '../../constants/Routes';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import { UserProfileServer } from '../../models/UserProfileServer';

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
}

interface DispatchProps {}

interface SetupProps extends OwnProps, StateProps, DispatchProps {}

const SetupPage: React.FC<SetupProps> = ({
  isLoggedIn,
  userProfileServer,
}) => {
  return (
    <IonPage id="setup-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Setup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList lines="full">
          <IonItem detail={true} routerLink={ROUTES.TABS_BANK} routerDirection="none">
            <IonIcon slot="start" icon={businessOutline} />
            <IonLabel>Banks</IonLabel>
          </IonItem>
          <IonItem detail={true} routerLink={ROUTES.TABS_EXPENSE_TYPE} routerDirection="none">
            <IonIcon slot="start" icon={pricetagOutline} />
            <IonLabel>Expense Categories</IonLabel>
          </IonItem>
          <IonItem detail={true} routerLink={ROUTES.TABS_TRANSACTION_TYPE} routerDirection="none">
            <IonIcon slot="start" icon={repeatOutline} />
            <IonLabel>Transaction Categories</IonLabel>
          </IonItem>
          <IonItem detail={true} routerLink={ROUTES.TABS_USER_TYPE} routerDirection="none">
            <IonIcon slot="start" icon={peopleOutline} />
            <IonLabel>Users</IonLabel>
          </IonItem>
          <IonItem detail={true} routerLink={ROUTES.TABS_VEHICLE} routerDirection="none">
            <IonIcon slot="start" icon={carOutline} />
            <IonLabel>Vehicles</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
  }),
  mapDispatchToProps: {},
  component: SetupPage
});
