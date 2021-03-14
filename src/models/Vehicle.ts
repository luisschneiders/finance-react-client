import { Pagination } from './Pagination';

export interface Vehicle {
  vehicleId: number;
  vehicleDescription: string;
  vehiclePlate: string;
  vehicleIsActive: boolean;
  vehicleInsertedBy: number;
  vehicleCreatedAt: string;
  vehicleUpdatedAt: string;
}

export interface VehicleList {
  vehicles: Vehicle[];
  pagination: Pagination;
}
