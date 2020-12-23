import { Summary } from "../../models/Summary";
import { getSummary } from "../api/Summary";

export const loadSummaryData = async (id: number, year: number) => {
  const response: any = await getSummary(id, year);
  const summary = response as Summary;
  const data: any = {
    summary
  }

  return data;
}
