import { createSelector } from 'reselect';
import { Vehicle, VehicleList } from '../../models/Vehicle';
import { AppState } from '../app/app.state';

const getVehicleListData = (state: AppState) => state.vehicleReducer.vehicleList;
const getVehicleData = (state: AppState) => state.vehicleReducer.vehicle;
const isFetchingVehicleListData = (state: AppState) => state.vehicleReducer.isFetching;
const isSavingVehicleData = (state: AppState) => state.vehicleReducer.isSaving;
const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
};

export const getVehicleList = createSelector(
  getVehicleListData,
  (vehicleList: VehicleList) => {
    return vehicleList;
  }
);

export const isFetchingVehicleList = createSelector(
  isFetchingVehicleListData,
  (isFetching: boolean) => {
    return isFetching;
  }
);

export const isSavingVehicle = createSelector(
  isSavingVehicleData,
  (isSaving: boolean) => {
    return isSaving;
  }
);

export const getVehicleFromList = createSelector(
  getVehicleListData, getIdParam,
  (vehicleList: VehicleList, id: number) => {
    if (vehicleList && vehicleList.vehicles && vehicleList.vehicles.length > 0) {
      return vehicleList.vehicles.find((e: any) => e.vehicleId.toString() === id);
    }
  }  
);

export const getVehicle = createSelector(
  getVehicleData,
  (vehicles: Vehicle) => {
    return vehicles;
  }  
);
