import {
  homeOutline,
  peopleOutline,
  logInOutline,
  cashOutline,
  cartOutline,
  mapOutline,
  timeOutline,
  logOutOutline,
  starOutline,
  cogOutline,
} from 'ionicons/icons';
import { AppPage } from '../models/AppPage';
import * as ROUTES from '../constants/Routes'

export function appPages() {
  const authenticated: AppPage[] = [
    { level: 'Menu', url: ROUTES.TABS_HOME, label: 'Home', icon: homeOutline },
    { level: 'Menu', url: ROUTES.TABS_EXPENSES, label: 'Expenses', icon: cartOutline },
    { level: 'Menu', url: ROUTES.TABS_TIMESHEETS, label: 'Timesheet', icon: timeOutline },
    { level: 'Menu', url: ROUTES.TABS_TRANSACTIONS, label: 'Transactions', icon: cashOutline },
    { level: 'Menu', url: ROUTES.TABS_TRIPS, label: 'Trips', icon: mapOutline },
    { level: 'Settings', url: ROUTES.ACCOUNT, label: 'Account', icon: peopleOutline },
    { level: 'Settings', url: ROUTES.SETUP, label: 'Setup', icon: cogOutline },
    { level: '', url: ROUTES.LOGOUT, label: 'Logout', icon: logOutOutline }
  ];

  const unauthenticated: AppPage[] = [
    { level: 'Menu', url: ROUTES.LOGIN, label: 'Login', icon: logInOutline },
    { level: 'Menu', url: ROUTES.REGISTER, label: 'Register', icon: starOutline },
  ];

  const pages: any = Object.assign({}, {
    authenticated,
    unauthenticated,
  });

  return pages;
}
