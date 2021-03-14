import {
  Vehicle,
  VehicleList
} from '../../models/Vehicle';

import {
  fetchVehicleList,
  addVehicle,
  updateVehicle,
  fetchVehicleById
} from '../api/Vehicle';

export const fetchVehicleData = async (id: number, page: number, pageSize: number) => {
  const response: any = await fetchVehicleList(id, page, pageSize);
  return response as VehicleList;
}

export const fetchVehicleByIdData = async (userId: number, vehicleId: number) => {
  const response: any = await fetchVehicleById(userId, vehicleId);
  return response as Vehicle;
}

export const addVehicleData = async (data: Partial<Vehicle>) => {
  const response: any = await addVehicle(data);
  return response as Vehicle;
}

export const updateVehicleData = async (data: Partial<Vehicle>) => {
  const response: any = await updateVehicle(data);
  return response as Vehicle;
}
