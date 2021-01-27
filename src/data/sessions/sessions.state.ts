import { Period } from "../../models/Period";

export interface SessionsState {
  menuEnabled: boolean;
  userProfile: any;
  homeTimeTransition: string;
  expensesTimeTransition: Period;
  transactionsTimeTransition: Period;
}
