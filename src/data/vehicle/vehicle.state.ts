import { Vehicle } from "../../models/Vehicle";
import { Pagination } from "../../models/Pagination";

export interface VehicleListState {
  vehicleList: {
    vehicles: Vehicle[];
    pagination: Pagination;
  };
  vehicle: Vehicle;
  isFetching: boolean;
  isSaving: boolean;
}
