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
import React, { useEffect } from 'react';
import { connect } from '../../data/connect';
import { AppColor } from '../../enum/AppColor';
import { UserProfileServer } from '../../models/UserProfileServer';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsVehicle from '../../data/vehicle/vehicle.selectors';
import { PageListItem } from '../../enum/PageListItem';
import LsListItemVehicle from '../../components/list/ListItemVehicle';
import {
  setVehicleList
} from '../../data/vehicle/vehicle.actions';
import { add } from 'ionicons/icons';
import LsModalVehicle from '../../components/modal/ModalVehicle';
import { setModalVehicleShow } from '../../data/modal/modal.actions';

interface StateProps {
  isLoggedIn: boolean;
  isFetching: boolean;
  userProfileServer: UserProfileServer;
}

interface DispatchProps {
  setVehicleList: typeof setVehicleList;
  setModalVehicleShow: typeof setModalVehicleShow;
}

interface VehicleProps extends StateProps, DispatchProps {}

const VehiclePage: React.FC<VehicleProps> = ({
  isLoggedIn,
  isFetching,
  userProfileServer,
  setVehicleList,
  setModalVehicleShow,
}) => {
  
  useEffect(() => {
    if (isLoggedIn && userProfileServer) {
      setVehicleList(userProfileServer.userId, 1, PageListItem.ITEM_12);
    }
  }, [
    isLoggedIn,
    userProfileServer,
    setVehicleList,
    setModalVehicleShow,
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Vehicles</IonTitle>
          <IonFab vertical="center" horizontal="end">
            <IonFabButton
              color={AppColor.TERTIARY}
              size="small"
              title="Add new record"
              onClick={() => setModalVehicleShow(true)}
            >
              <IonIcon 
                icon={add}
                size="small"
              />
            </IonFabButton>
          </IonFab>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={isFetching}></IonLoading>
      <IonContent className="ion-no-padding">
        <LsListItemVehicle />
        <LsModalVehicle />
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    isFetching: selectorsVehicle.isFetchingVehicleList(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
  }),
  mapDispatchToProps: ({
    setVehicleList,
    setModalVehicleShow,
  }),
  component: React.memo(VehiclePage)
});
