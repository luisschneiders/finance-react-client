import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { AppColor } from '../../enum/AppColor';
import { ModalProvider } from './ModalProvider';
import LsMainModal from './MainModal';
import { toast } from '../toast/Toast';
import { StatusColor } from '../../enum/StatusColor';
import { useModal } from '../../hooks/useModal';
import { UserProfileServer } from '../../models/UserProfileServer';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsModal from '../../data/modal/modal.selectors';
import { setModalVehicleShow } from '../../data/modal/modal.actions';
import { addVehicle } from '../../data/vehicle/vehicle.actions';

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
  isShowModalVehicle: boolean;
}

interface DispatchProps {
  setModalVehicleShow: typeof setModalVehicleShow;
  addVehicle: typeof addVehicle;
}

interface ModalVehicleProps extends StateProps, DispatchProps {}

const LsModalVehicle: React.FC<ModalVehicleProps> = ({
    isLoggedIn,
    userProfileServer,
    isShowModalVehicle,
    setModalVehicleShow,
    addVehicle,
  }) => {

  const { showModal, isSubmitting, handleShow, handleClose } = useModal();

  const [vehicleDescription, setVehicleDescription] = useState<string>('');
  const [vehiclePlate, setVehiclePlate] = useState<string>('');

  useEffect(() => {
    if (isShowModalVehicle) {
      handleShow();
      setModalVehicleShow(false);
    }
  }, [
    isLoggedIn,
    userProfileServer,
    isShowModalVehicle,
    setModalVehicleShow,
    handleShow
  ])

  const vehicleForm = async(e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vehicleDescription) {
      return toast('Vehicle is required!', StatusColor.WARNING);
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
    <ModalProvider>
      <LsMainModal
        id="modal-vehicle"
        show={showModal}
        title="New vehicle"
        isSubmitting={isSubmitting}
        closeModal={handleClose}
      >
          <form noValidate onSubmit={vehicleForm}>
            <IonItem>
              <IonLabel position="stacked">Vehicle</IonLabel>
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
                >
                  Save
                </IonButton>
              </div>
            </IonItem>
          </form>
      </LsMainModal>
    </ModalProvider>
  );
}

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
    isShowModalVehicle: selectorsModal.showModalVehicle(state),
  }),
  mapDispatchToProps: ({
    setModalVehicleShow,
    addVehicle,
  }),
  component: LsModalVehicle
});
