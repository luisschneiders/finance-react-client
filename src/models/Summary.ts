import { SummaryPurchases } from './SummaryPurchases';
import { SummaryIncomesOutcomesTransfers } from './SummaryIncomesOutcomesTransfers';
import { SummaryTransactions } from './SummaryTransactions';
import { Bank } from './Bank';
import { SummaryPurchasesByType } from './SummaryPurchasesByType';
import { SummaryTimesheets } from './SummaryTimesheets';

export interface Summary {
  incomesOutcomesTransfers: SummaryIncomesOutcomesTransfers[];
  purchases: SummaryPurchases[];
  transactions: SummaryTransactions[];
  banks: Bank[];
  purchasesByType: SummaryPurchasesByType[];
  timesheets: SummaryTimesheets[];
}
