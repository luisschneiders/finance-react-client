import React, { useEffect, useState } from 'react';
import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import { UserProfileServer } from '../../models/UserProfileServer';

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
}

interface DispatchProps {

}

interface ExpensesProps extends StateProps, DispatchProps {}

const Expenses: React.FC<ExpensesProps> = ({
  isLoggedIn,
  userProfileServer,
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    setIsLoaded(true);

    if (isLoggedIn) {

    }

  }, [
    isLoggedIn,
    userProfileServer
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton auto-hide="true"></IonMenuButton>
          </IonButtons>
          <IonTitle>Expenses</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* <IonLoading message="Fetching data..." duration={0} isOpen={isLoaded}></IonLoading> */}
      <IonContent>
        <IonFab vertical="top" horizontal="end" edge slot="fixed">
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps> ({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsUser.getUserProfileServer(state),
  }),
  mapDispatchToProps: ({

  }),
  component: React.memo(Expenses)
});
