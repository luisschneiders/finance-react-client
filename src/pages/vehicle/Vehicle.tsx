import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { toast } from '../../components/toast/Toast';
import { connect } from '../../data/connect';
import { AppColor } from '../../enum/AppColor';
import { StatusColor } from '../../enum/StatusColor';
import { UserProfileServer } from '../../models/UserProfileServer';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsVehicle from '../../data/vehicle/vehicle.selectors';
import { PageSize } from '../../enum/PageSize';
import LsListItemVehicle from '../../components/list/ListItemVehicle';
import {
  addVehicle,
  setVehicleList
} from '../../data/vehicle/vehicle.actions';
import { ModalProvider } from '../../components/modal/ModalProvider';
import { add } from 'ionicons/icons';
import { useModal } from '../../hooks/useModal';
import LsMainModal from '../../components/modal/MainModal';

interface StateProps {
  isLoggedIn: boolean;
  isSaving: boolean;
  isFetching: boolean;
  userProfileServer: UserProfileServer;
}

interface DispatchProps {
  setVehicleList: typeof setVehicleList;
  addVehicle: typeof addVehicle;
}

interface VehicleProps extends StateProps, DispatchProps {}

const VehiclePage: React.FC<VehicleProps> = ({
  isLoggedIn,
  isFetching,
  isSaving,
  userProfileServer,
  setVehicleList,
  addVehicle,
}) => {
  const { showModal, isSubmitting, handleShow, handleClose } = useModal();

  const [vehicleDescription, setVehicleDescription] = useState<string>('');
  const [vehiclePlate, setVehiclePlate] = useState<string>('');
  
  useEffect(() => {
    if (isLoggedIn && userProfileServer) {
      setVehicleList(userProfileServer.userId, 1, PageSize.S_12);
    }
  }, [isLoggedIn, userProfileServer, setVehicleList]);

  const vehicleForm = async(e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vehicleDescription) {
      return toast('Description is required!', StatusColor.WARNING);
    }
    if (!vehiclePlate) {
      return toast('Plate is required!', StatusColor.WARNING);
    }

    addVehicle({
      vehicleDescription,
      vehiclePlate,
      vehicleInsertedBy: userProfileServer.userId,
      vehicleIsActive: true
    });
    setVehicleDescription('');
    setVehiclePlate('');
    handleClose();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Vehicles</IonTitle>
          <IonFab vertical="center" horizontal="end">
            <IonFabButton color={AppColor.TERTIARY} size="small" title="Add new record">
              <IonIcon 
                icon={add}
                onClick={() => handleShow()}
                size="small"
              />
            </IonFabButton>
          </IonFab>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={isFetching}></IonLoading>
      <IonContent className="ion-padding">
        <LsListItemVehicle />
      </IonContent>
      <ModalProvider>
      <LsMainModal
        id="transaction-type"
        show={showModal}
        title="New vehicle"
        isSubmitting={isSubmitting}
        closeModal={handleClose}
      >
          <form noValidate onSubmit={vehicleForm}>
            <IonItem>
              <IonLabel position="stacked">Description</IonLabel>
              <IonInput
                name="vehicleDescription"
                type="text"
                value={vehicleDescription} spellCheck={false} autocapitalize="off"
                onIonChange={(e: any) => setVehicleDescription(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Plate</IonLabel>
              <IonInput
                name="vehiclePlate"
                type="text"
                value={vehiclePlate} spellCheck={false} autocapitalize="off"
                onIonChange={(e: any) => setVehiclePlate(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem lines="none">
              <div slot="end" className="ion-padding-vertical">
                <IonButton
                  type="submit"
                  fill="outline"
                  color={AppColor.SUCCESS}
                  disabled={isSaving}
                >
                  Save
                </IonButton>
              </div>
            </IonItem>
          </form>
      </LsMainModal>
      </ModalProvider>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    isSaving: selectorsVehicle.isSavingVehicle(state),
    isFetching: selectorsVehicle.isFetchingVehicleList(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
  }),
  mapDispatchToProps: ({
    setVehicleList,
    addVehicle,
  }),
  component: React.memo(VehiclePage)
});
