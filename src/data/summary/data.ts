import { Summary } from '../../models/Summary';
import { fetchSummary } from '../api/Summary';

export const fetchSummaryData = async (id: number, year: number) => {
  const response: any = await fetchSummary(id, year);
  const summary = response as Summary;
  const data: any = {
    summary
  };

  return data;
}
