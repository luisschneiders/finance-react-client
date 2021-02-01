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
import * as ROUTES from '../../constants/Routes'

interface OwnProps extends RouteComponentProps {}

interface StateProps {}

interface DispatchProps {}

interface SetupProps extends OwnProps, StateProps, DispatchProps {}

const SetupPage: React.FC<SetupProps> = ({

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
          <IonItem detail={true} routerLink={ROUTES.SETUP_BANKS}>
            <IonIcon slot="start" icon={businessOutline} />
            <IonLabel>Banks</IonLabel>
          </IonItem>
          <IonItem detail={true} routerLink={ROUTES.SETUP_EXPENSES_TYPE}>
            <IonIcon slot="start" icon={pricetagOutline} />
            <IonLabel>Expenses</IonLabel>
          </IonItem>
          <IonItem detail={true} routerLink={ROUTES.SETUP_TRANSACTIONS_TYPE}>
            <IonIcon slot="start" icon={repeatOutline} />
            <IonLabel>Transactions</IonLabel>
          </IonItem>
          <IonItem detail={true} routerLink={ROUTES.SETUP_USERS}>
            <IonIcon slot="start" icon={peopleOutline} />
            <IonLabel>Users</IonLabel>
          </IonItem>
          <IonItem detail={true} routerLink={ROUTES.SETUP_VEHICLES}>
            <IonIcon slot="start" icon={carOutline} />
            <IonLabel>Vehicles</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: () => ({}),
  mapDispatchToProps: {},
  component: SetupPage
});
