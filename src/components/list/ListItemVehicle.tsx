import React, { useEffect, useState } from 'react';
import {
  IonLabel,
  IonItem,
  IonList,
  IonButton,
  IonToggle,
} from '@ionic/react';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsVehicle from '../../data/vehicle/vehicle.selectors';
import { Vehicle, VehicleList } from '../../models/Vehicle';
import { AppColor } from '../../enum/AppColor';
import { StatusColor } from '../../enum/StatusColor';
import {
  setVehicleList,
  updateVehicle
} from '../../data/vehicle/vehicle.actions';
import { UserProfileServer } from '../../models/UserProfileServer';
import { PageSize } from '../../enum/PageSize';
import LsMainCard from '../card/MainCard';
import * as ROUTES from '../../constants/Routes';

interface StateProps {
  isLoggedIn: boolean;
  isFetching: boolean;
  userProfileServer: UserProfileServer;
  vehicleList: VehicleList;
}

interface DispatchProps {
  setVehicleList: typeof setVehicleList;
  updateVehicle: typeof updateVehicle;
}

interface ListVehicleProps extends StateProps, DispatchProps {}

const LsListItemVehicle: React.FC<ListVehicleProps> = ({
    isLoggedIn,
    isFetching,
    userProfileServer,
    vehicleList,
    setVehicleList,
    updateVehicle,
  }) => {
  const [vehicle, setVehicle] = useState<Vehicle[]>([]);

  useEffect(() => {
    if (vehicleList) {
      setVehicle(vehicleList.vehicles);
    }
  }, [vehicleList, isFetching]);

  const loadMore = () => {
    if (isLoggedIn && userProfileServer) {
      let newPage: number = vehicleList.pagination.page;
      ++newPage;
      setVehicleList(userProfileServer.userId, newPage, PageSize.S_12);
    }
  };

  const changeStatus = async (vehicle: Vehicle) => {
    if (vehicle) {
      const newVehicle: Vehicle = vehicle;
      newVehicle.vehicleIsActive = !vehicle.vehicleIsActive

      updateVehicle(newVehicle);
    }
  }
  
  return (
    <>
      {vehicle && vehicle.length > 0 &&
        <IonList lines="full">
          {vehicle.map((item: Vehicle, index: number) => (
            <IonItem key={index}>
              <IonLabel>
                <IonItem
                  className="ion-text-uppercase"
                  lines="none"
                  routerLink={`${ROUTES.SETUP_VEHICLE}/${item.vehicleId}`}
                >
                  <IonLabel slot="start" color={item.vehicleIsActive ? StatusColor.SUCCESS : StatusColor.DEFAULT}>
                    {item.vehicleDescription}
                  </IonLabel>
                  <IonLabel slot="end" color={item.vehicleIsActive ? StatusColor.SUCCESS : StatusColor.DEFAULT}>
                    {item.vehiclePlate}
                  </IonLabel>
                </IonItem>
              </IonLabel>
              <div slot="end">
                <IonToggle color={StatusColor.SUCCESS} checked={item.vehicleIsActive} onClick={() => changeStatus(item)} />
              </div>
            </IonItem>
          ))}
        </IonList>
      }
      {vehicle && vehicle.length > 0 && (vehicleList.pagination.pageCount > vehicleList.pagination.page) &&
        <div className="ion-text-center">
          <IonButton fill="clear" color={AppColor.TERTIARY} disabled={isFetching} onClick={loadMore}>Load more...</IonButton>
        </div>
      }
      {!vehicle.length && 
        <LsMainCard color={StatusColor.WARNING} message="No records found!"></LsMainCard>
      }
    </>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isFetching: selectorsVehicle.isFetchingVehicleList(state),
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
    vehicleList: selectorsVehicle.getVehicleList(state),
  }),
  mapDispatchToProps: ({
    setVehicleList,
    updateVehicle,
  }),
  component: LsListItemVehicle
});