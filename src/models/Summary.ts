import { PurchasesSummary } from './PurchasesSummary';
import { IncomesOutcomesTransfersSummary } from './IncomesOutcomesTransfersSummary';
import { TransactionsSummary } from './TransactionsSummary';
import { Banks } from './Banks';
import { PurchasesByTypeSummary } from './PurchasesByTypeSummary';
import { TimesheetsSummary } from './TimesheetsSummary';

export interface Summary {
  incomesOutcomesTransfers: IncomesOutcomesTransfersSummary[];
  purchases: PurchasesSummary[];
  transactions: TransactionsSummary[];
  banks: Banks[];
  purchasesByType: PurchasesByTypeSummary[];
  timesheets: TimesheetsSummary[];
}
