import { Vehicle, VehicleList } from '../../models/Vehicle';
import * as ROUTES from '../../constants/Routes';
import { toast } from '../../components/toast/Toast';
import { StatusColor } from '../../enum/StatusColor';
import { PageListItem } from '../../enum/PageListItem';

export function fetchVehicleList(id: number, page: number, pageSize: number) {

  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/get-all-vehicles/id=${id}&page=${page}&pageSize=${pageSize}`)
          .then(response => {
            resStatus = response.status;
            return response.json()
          })
          .then((result: VehicleList) => {

            const vehiclesMap: Vehicle[] = [];
            result.vehicles.forEach((item: any) => {
              const vehicles: Vehicle = {
                vehicleId: item.id,
                vehicleDescription: item.vehicleDescription,
                vehiclePlate: item.vehiclePlate,
                vehicleIsActive: item.vehicleIsActive === 0 ? false : true,
                vehicleInsertedBy: item.vehicleInsertedBy,
                vehicleCreatedAt: item.created_at,
                vehicleUpdatedAt: item.updated_at,
              };
              vehiclesMap.push(vehicles);
            });

            const vehicleList: VehicleList = {
              vehicles: vehiclesMap,
              pagination: result.pagination
            };

            return vehicleList;
          },
          (error) => {
            // Assign initial state as response
            const vehicleList: VehicleList = {
              vehicles: [],
              pagination: {page: 1, pageSize: PageListItem.ITEM_12, pageCount: 0, rowCount: 0}
            };

            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);

            return vehicleList;
          });
}

export function fetchVehicleById(userId: number, vehicleId: number) {

  let resStatus: any = null; 
  
  return fetch(`${ROUTES.SERVER}/vehicle-id/vehicleInsertedBy=${userId}&id=${vehicleId}`)
          .then(response => {
            resStatus = response.status;
            return response.json();
          })
          .then((result: any) => {
            switch (resStatus) {
              case 200:
              case 201:
                const vehicle: Vehicle = {
                  vehicleId: result.id,
                  vehicleDescription: result.vehicleDescription,
                  vehiclePlate: result.vehiclePlate,
                  vehicleIsActive: result.vehicleIsActive,
                  vehicleInsertedBy: result.vehicleInsertedBy,
                  vehicleCreatedAt: result.created_at,
                  vehicleUpdatedAt: result.updated_at,
                };
                return vehicle;
              default:
                toast(`Code: ${resStatus} -> Unhandled`, StatusColor.ERROR, 4000);
                return false;
            }
          }).catch((error) => {
            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);
            return false;
          })
}

export function addVehicle(data: Partial<Vehicle>) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/vehicle-new/vehicleInsertedBy=${data.vehicleInsertedBy}`, requestOptions)
          .then(response => {
            resStatus = response.status;
            return response.json();
          })
          .then((result: any) => {
            switch (resStatus) {
              case 200:
              case 201:
                const vehicle: Vehicle = {
                  vehicleId: result.vehicle.id,
                  vehicleDescription: result.vehicle.vehicleDescription,
                  vehiclePlate: result.vehicle.vehiclePlate,
                  vehicleIsActive: result.vehicle.vehicleIsActive,
                  vehicleInsertedBy: result.vehicle.vehicleInsertedBy,
                  vehicleCreatedAt: result.vehicle.created_at,
                  vehicleUpdatedAt: result.vehicle.updated_at,
                };
                toast(result.msg, StatusColor.SUCCESS, 4000);
                return vehicle;
              default:
                toast(`Code: ${resStatus} -> Unhandled`, StatusColor.ERROR, 4000);
                return false;
            }
          }).catch((error) => {
            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);
            return false;
          });
}

export function updateVehicle(data: Partial<Vehicle>) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/vehicle-id/vehicleInsertedBy=${data.vehicleInsertedBy}&id=${data.vehicleId}`, requestOptions)
  .then(response => {
    resStatus = response.status;
    return response.json();
  })
  .then((result: any) => {
    switch (resStatus) {
      case 200:
      case 201:
        const vehicle: Vehicle = {
          vehicleId: result.vehicle.id,
          vehicleDescription: result.vehicle.vehicleDescription,
          vehiclePlate: result.vehicle.vehiclePlate,
          vehicleIsActive: result.vehicle.vehicleIsActive,
          vehicleInsertedBy: result.vehicle.vehicleInsertedBy,
          vehicleCreatedAt: result.vehicle.created_at,
          vehicleUpdatedAt: result.vehicle.updated_at,
        };
        toast(result.msg, StatusColor.SUCCESS, 4000);
        return vehicle;
      default:
        toast(`Code: ${resStatus} -> Unhandled`, StatusColor.ERROR, 4000);
        return false;
    }
  }).catch((error) => {
    toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);
    return false;
  });

}
