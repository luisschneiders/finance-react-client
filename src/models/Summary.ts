import { SummaryPurchases } from './SummaryPurchases';
import { SummaryIncomesOutcomesTransfers } from './SummaryIncomesOutcomesTransfers';
import { SummaryTransactions } from './SummaryTransactions';
import { Banks } from './Banks';
import { SummaryPurchasesByType } from './SummaryPurchasesByType';
import { SummaryTimesheets } from './SummaryTimesheets';

export interface Summary {
  incomesOutcomesTransfers: SummaryIncomesOutcomesTransfers[];
  purchases: SummaryPurchases[];
  transactions: SummaryTransactions[];
  banks: Banks[];
  purchasesByType: SummaryPurchasesByType[];
  timesheets: SummaryTimesheets[];
}
