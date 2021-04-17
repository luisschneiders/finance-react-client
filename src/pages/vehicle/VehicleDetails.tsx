import React, { useEffect, useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTitle,
  IonButton,
  IonList,
} from '@ionic/react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router';
import { connect } from '../../data/connect';
import * as ROUTES from '../../constants/Routes';
import { Vehicle } from '../../models/Vehicle';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsVehicle from '../../data/vehicle/vehicle.selectors';
import { AppColor } from '../../enum/AppColor';
import { StatusColor } from '../../enum/StatusColor';
import { toast } from '../../components/toast/Toast';
import { setVehicleById, updateVehicle } from '../../data/vehicle/vehicle.actions';
import { UserProfileServer } from '../../models/UserProfileServer';

interface OwnProps extends RouteComponentProps<{
  id: string;
}>{}

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
  vehicle: Vehicle | undefined;
  vehicleById: Vehicle;
};

interface DispatchProps {
  setVehicleById: typeof setVehicleById;
  updateVehicle: typeof updateVehicle;
};

interface VehicleDetailsProps extends OwnProps, StateProps, DispatchProps {};

const VehicleDetailsPage: React.FC<VehicleDetailsProps> = ({
    isLoggedIn,
    userProfileServer,
    match,
    vehicle,
    vehicleById,
    setVehicleById,
    updateVehicle,
  }) => {

    const [vehicleDescription, setVehicleDescription] = useState<string>('');
    const [vehiclePlate, setVehiclePlate] = useState<string>('');
    const [isById, setIsById] = useState<boolean>(false);

    useEffect(() => {
      if (isLoggedIn && userProfileServer) {
        // If user refresh the page, fetch the vehicle by id only once
        if (!vehicle && !isById) {
          setVehicleById(userProfileServer.userId, parseInt(match.params.id));
          setIsById(true);
        }
      }

      if (vehicle) {
        setVehicleDescription(vehicle.vehicleDescription);
        setVehiclePlate(vehicle.vehiclePlate);
      } else if (vehicleById) {
        setVehicleDescription(vehicleById.vehicleDescription);
        setVehiclePlate(vehicleById.vehiclePlate);
      }

    }, [
      isLoggedIn,
      userProfileServer,
      vehicle,
      match,
      vehicleById,
      setVehicleById,
      isById,
    ]);

    const formVehicle = async (e: React.FormEvent) => {
      e.preventDefault();

      if (vehicleDescription.trim() === '') {
        return toast('Description is required!', StatusColor.WARNING);
      }
      if (vehiclePlate.trim() === '') {
        return toast('Plate is required!', StatusColor.WARNING);
      }

      const newVehicle: Vehicle = vehicle || vehicleById;
      newVehicle.vehicleDescription = vehicleDescription;
      newVehicle.vehiclePlate = vehiclePlate;

      updateVehicle(newVehicle);
    }

  return (
    <IonPage id="news-details-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={ROUTES.TABS_VEHICLE}></IonBackButton>
          </IonButtons>
          <IonTitle className="ion-text-capitalize">
            Update <span className="ion-text-underline"> {vehicleDescription}</span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={formVehicle}>
          <IonList>
            <IonItem lines="full" disabled={!vehicle && !vehicleById}>
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Description</IonLabel>
              <IonInput name="vehicleDescription" type="text"
                        value={vehicleDescription} spellCheck={false} autocapitalize="off"
                        onIonChange={(e: any) => setVehicleDescription(e.detail.value!)} required>
              </IonInput>
            </IonItem>
            <IonItem lines="full" disabled={!vehicle && !vehicleById}>
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Plate</IonLabel>
              <IonInput name="vehiclePlate" type="text"
                        value={vehiclePlate} spellCheck={false} autocapitalize="off"
                        onIonChange={(e: any) => setVehiclePlate(e.detail.value!)} required>
              </IonInput>
            </IonItem>
            <IonItem lines="none" disabled={!vehicle && !vehicleById}>
              <div slot="end">
                <IonButton
                  type="submit"
                  fill="outline"
                >Update</IonButton>
              </div>
            </IonItem>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
    vehicle: selectorsVehicle.getVehicleFromList(state, OwnProps),
    vehicleById: selectorsVehicle.getVehicle(state),
  }),
  mapDispatchToProps: ({
    setVehicleById,
    updateVehicle,
  }),
  component: withRouter(VehicleDetailsPage)
});
