import {
  VEHICLE_ADD,
  VEHICLE_LIST_SET,
  VEHICLE_LIST_IS_FETCHING,
  VEHICLE_IS_SAVING,
  VEHICLE_UPDATE,
  VEHICLE_BY_ID_SET,
} from '../actionTypes';
import { VehicleAction } from './vehicle.actions';
import { VehicleListState } from './vehicle.state';

export const vehicleReducer = (state: VehicleListState, action: VehicleAction) : VehicleListState => {
  switch (action.type) {
    case VEHICLE_ADD:
      // Add new Vehicle in the list, 
      // then remove the last item from the array list
      // and check if page is smaller than pageCount, to prevent the slice
      const vehicles: any[] = (
        state.vehicleList.pagination.page < state.vehicleList.pagination.pageCount ?
        state.vehicleList.vehicles.slice(0, -1) : state.vehicleList.vehicles
      );

      return {
        ...state,
        vehicleList: {
          vehicles: [action.payload, ...vehicles],
          pagination: {...state.vehicleList.pagination},
        }
      };
    case VEHICLE_UPDATE:
      return {
        ...state
      };
    case VEHICLE_LIST_SET:
      return {
        ...state,
        vehicleList: {
          vehicles: [...state.vehicleList.vehicles, ...action.payload.vehicles],
          pagination: {...state.vehicleList.pagination, ...action.payload.pagination},
        }
      }
    case VEHICLE_BY_ID_SET:
      return {
        ...state,
        vehicle: action.payload
      }
    case VEHICLE_LIST_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case VEHICLE_IS_SAVING:
      return {
        ...state,
        isSaving: action.payload
      }
  }
}
