import { Vehicle, VehicleList } from '../../models/Vehicle';
import { ActionType } from '../../util/types';
import {
  VEHICLE_ADD,
  VEHICLE_LIST_SET,
  VEHICLE_LIST_IS_FETCHING,
  VEHICLE_IS_SAVING,
  VEHICLE_UPDATE,
  VEHICLE_BY_ID_SET,
} from '../actionTypes';
import {
  fetchVehicleData,
  addVehicleData,
  updateVehicleData,
  fetchVehicleByIdData
} from './data';

const saveVehicleAction = (data: Vehicle) => {
  return ({
    type: VEHICLE_ADD,
    payload: data
  } as const);
}

const updateVehicleAction = (data: Vehicle) => {
  return ({
    type: VEHICLE_UPDATE,
    payload: data
  } as const);
}

const setVehicleListAction = (data: VehicleList) => {
  return ({
    type: VEHICLE_LIST_SET,
    payload: data
  } as const);
}

const setVehicleByIdAction = (data: Vehicle) => {
  return ({
    type: VEHICLE_BY_ID_SET,
    payload: data
  } as const);
}

const isFetchingVehicleListAction = (isFetching: boolean) => {
  return ({
    type: VEHICLE_LIST_IS_FETCHING,
    payload: isFetching
  } as const);
}

const isSavingVehicleAction = (isSaving: boolean) => {
  return ({
    type: VEHICLE_IS_SAVING,
    payload: isSaving
  } as const);
}

export const isFetchingVehicleList = (isFetching: boolean) => async () => {
  return isFetchingVehicleListAction(isFetching);
}

export const isSavingVehicle = (isSaving: boolean) => async () => {
  return isSavingVehicleAction(isSaving);
}

export const setVehicleList = (id: number, page: number, pageSize: number) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isFetchingVehicleListAction(true));
  const data = await fetchVehicleData(id, page, pageSize);
  dispatch(isFetchingVehicleListAction(false));
  return setVehicleListAction(data);
}

export const setVehicleById = (userId: number, vehicleId: number) => async (dispatch: React.Dispatch<any>) => {

  const data = await fetchVehicleByIdData(userId, vehicleId);

  return setVehicleByIdAction(data);
}

export const addVehicle = (data: Partial<Vehicle>) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isSavingVehicleAction(true));
  const vehicle = await addVehicleData(data);
  dispatch(isSavingVehicleAction(false));
  return saveVehicleAction(vehicle);
}

export const updateVehicle = (data: Partial<Vehicle>) => async (dispatch: React.Dispatch<any>) => {
  const vehicle = await updateVehicleData(data);
  return updateVehicleAction(vehicle);
}

export type VehicleAction = 
  | ActionType<typeof addVehicle>
  | ActionType<typeof updateVehicle>
  | ActionType<typeof setVehicleList>
  | ActionType<typeof setVehicleById>
  | ActionType<typeof isFetchingVehicleList>
  | ActionType<typeof isSavingVehicle>
