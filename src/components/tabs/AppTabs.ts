import {
  homeOutline,
  cartOutline,
  cashOutline,
} from "ionicons/icons";
import { AppPage } from "../../models/AppPage";
import * as ROUTES from '../../constants/Routes'

export function appTabs() {
  const authenticated: AppPage[] = [
    { url: ROUTES.TABS_MAIN, label: 'Home', icon: homeOutline },
    { url: ROUTES.TABS_TRANSACTIONS, label: 'Transactions', icon: cashOutline },
    { url: ROUTES.TABS_EXPENSES, label: 'Expenses', icon: cartOutline },
  ];

  const unauthenticated: AppPage[] = [
  ];

  const tabs: any = Object.assign({}, {
    authenticated,
    unauthenticated,
  });

  return tabs;
}
