import {
  homeOutline,
  cartOutline,
  cashOutline,
  logInOutline,
  starOutline,
  happyOutline,
} from 'ionicons/icons';
import { AppPage } from '../../models/AppPage';
import * as ROUTES from '../../constants/Routes'

export function appTabs() {
  const authenticated: AppPage[] = [
    { url: ROUTES.TABS_HOME, label: '', icon: homeOutline },
    { url: ROUTES.TABS_EXPENSES, label: '', icon: cartOutline },
    { url: ROUTES.TABS_TRANSACTIONS, label: '', icon: cashOutline },
  ];

  const unauthenticated: AppPage[] = [
    { url: ROUTES.WELCOME, label: 'Welcome', icon: happyOutline },
    { url: ROUTES.LOGIN, label: 'Login', icon: logInOutline },
    { url: ROUTES.REGISTER, label: 'Register', icon: starOutline },
  ];

  const tabs: any = Object.assign({}, {
    authenticated,
    unauthenticated,
  });

  return tabs;
}
