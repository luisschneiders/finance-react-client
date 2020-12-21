import { PurchasesSummary } from "./PurchasesSummary";
import { IncomesOutcomesTransfersSummary } from "./IncomesOutcomesTransfersSummary";
import { TransactionsSummary } from "./TransactionsSummary";
import { Banks } from "./Banks";

export interface Summary {
  incomesOutcomesTransfers: IncomesOutcomesTransfersSummary[];
  purchases: PurchasesSummary[];
  transactions: TransactionsSummary[];
  banks: Banks[];
}
