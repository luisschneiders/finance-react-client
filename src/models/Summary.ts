import { PurchasesSummary } from "./PurchasesSummary";
import { IncomesOutcomesTransfersSummary } from "./IncomesOutcomesTransfersSummary";
import { TransactionsSummary } from "./TransactionsSummary";
import { Banks } from "./Banks";
import { PurchasesByTypeSummary } from "./PurchasesByTypeSummary";
import { TimesheetSummary } from "./TimesheetSummary";

export interface Summary {
  incomesOutcomesTransfers: IncomesOutcomesTransfersSummary[];
  purchases: PurchasesSummary[];
  transactions: TransactionsSummary[];
  banks: Banks[];
  purchasesByType: PurchasesByTypeSummary[];
  timesheet: TimesheetSummary[];
}
