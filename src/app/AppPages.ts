import {
  homeOutline,
  logOut,
  peopleOutline,
  logInOutline,
  cashOutline,
  cartOutline
} from 'ionicons/icons';
import { AppPage } from '../models/AppPage';
import * as ROUTES from '../constants/Routes'

export function appPages() {
  const authenticated: AppPage[] = [
    { level: 'Menu', url: ROUTES.TABS_MAIN, label: 'Home', icon: homeOutline },
    { level: 'Menu', url: ROUTES.TABS_TRANSACTIONS, label: 'Transactions', icon: cashOutline },
    { level: 'Menu', url: ROUTES.TABS_EXPENSES, label: 'Expenses', icon: cartOutline },
    { level: 'Settings', url: ROUTES.ACCOUNT, label: 'Account', icon: peopleOutline },
    { level: '', url: ROUTES.LOGOUT, label: 'Logout', icon: logOut }
  ];

  const unauthenticated: AppPage[] = [
    { level: 'Menu', url: ROUTES.LOGIN, label: 'Login', icon: logInOutline },
  ];

  const pages: any = Object.assign({}, {
    authenticated,
    unauthenticated,
  });

  return pages;
}
