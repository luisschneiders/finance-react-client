import {
  homeOutline,
  cartOutline,
  cashOutline,
  logInOutline,
  starOutline,
  happyOutline,
  cogOutline,
} from 'ionicons/icons';
import { AppPage } from '../../models/AppPage';
import * as ROUTES from '../../constants/Routes'

export function appTabs() {
  const authenticated: AppPage[] = [
    { url: ROUTES.TABS_HOME, label: 'Home', icon: homeOutline },
    { url: ROUTES.TABS_EXPENSES, label: 'Expenses', icon: cartOutline },
    { url: ROUTES.TABS_TRANSACTIONS, label: 'Transactions', icon: cashOutline },
    { url: ROUTES.TABS_SETUP, label: 'Setup', icon: cogOutline },
  ];

  const unauthenticated: AppPage[] = [
    { url: ROUTES.WELCOME, label: 'Welcome', icon: happyOutline },
    { url: ROUTES.LOGIN, label: 'Login', icon: logInOutline },
    { url: ROUTES.REGISTER, label: 'Register', icon: starOutline },
    { url: '/', label: '', icon: '' },
  ];

  const tabs: any = Object.assign({}, {
    authenticated,
    unauthenticated,
  });

  return tabs;
}
