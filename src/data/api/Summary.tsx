import { Summary } from "../../models/Summary";
import * as ROUTES from '../../constants/Routes';

export function getSummary(id: number, year: number) {
  return fetch(`${ROUTES.SERVER}/main-by-year/id=${id}&year=${year}`)
          .then(response => response.json())
          .then((result: Summary[]) => {

            const summary: any = {
              incomesOutcomesTransfers: [],
              purchases: [],
              transactions: [],
              banks: [],
              purchasesByType: [],
              timesheets: [],
            };

            Object.keys(summary).forEach((key: any, indexSummary: any) => {
              result.forEach((data: any, indexResult: any) => {
                if (indexSummary === indexResult) {
                  summary[key] = data;
                }
              });
            });

            return summary;
          })
}
