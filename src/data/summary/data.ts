import { getSummary } from "../api/Summary";

export const loadSummaryData = async (id: number, year: number) => {
  const response: any = await Promise.all([
    getSummary(id, year)
  ]);

  const transactions = response[0];
  const data: any = {
    transactions
  }
  return data;
}