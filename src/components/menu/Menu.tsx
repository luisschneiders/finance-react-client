import React from 'react';
import { setDarkMode } from '../../data/user/user.actions'
import {
  RouteComponentProps,
  useLocation,
  withRouter
} from 'react-router'
import {
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonToggle } from '@ionic/react';
import './Menu.scss'
import {
  businessOutline,
  moonOutline, sunnyOutline,
} from 'ionicons/icons';
import { connect } from '../../data/connect';
import { appPages } from '../../app/AppPages';
import { AppColor } from '../../enum/AppColor';
import LsMainChip from '../chip/MainChip';

interface StateProps {
  darkMode: boolean;
  isAuthenticated: boolean;
  menuEnabled: boolean;
}

interface DispatchProps {
  setDarkMode: typeof setDarkMode
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps {}

const LsMenu: React.FC<MenuProps> = ({darkMode, history, isAuthenticated, setDarkMode, menuEnabled}) => {
  const location = useLocation();

  const renderMenuItems = (pages: any[], menu: string) => {
    return pages
      .filter(item => !!item.url && item.level === menu)
      .map((page, index, array) => {
        let level: any = null;
        if (index === 0) {
          level = page.level;
        } else {
          if (array[index]?.level !== array[index-1]?.level ) {
            level = page.level;
          }
        }

        return (
          <IonMenuToggle key={index} auto-hide="false">
            {level ? <IonListHeader>{page.level}</IonListHeader>: null}
            <IonItem detail={false} routerLink={page.url} routerDirection="none" className={location.pathname.startsWith(page.url) ? 'selected' : undefined}>
              <IonIcon slot="start" icon={page.icon} />
              <IonLabel>{page.label}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        )
      });
  }

  return (
    <IonMenu type="overlay" disabled={!menuEnabled} contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          {isAuthenticated ? renderMenuItems(appPages().authenticated, 'Menu') : renderMenuItems(appPages().unauthenticated, 'Menu')}
        </IonList>
        <IonList lines="none">
          {isAuthenticated ? renderMenuItems(appPages().authenticated, 'Settings') : renderMenuItems(appPages().unauthenticated, 'Settings')}
        </IonList>
        <IonList lines="none">
          <IonListHeader>Appearance</IonListHeader>
          <IonItem>
            {!darkMode ? <IonIcon slot="start" icon={moonOutline}></IonIcon> : <IonIcon slot="start" icon={sunnyOutline}></IonIcon>}
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle checked={darkMode} onClick={() => setDarkMode(!darkMode)} />
          </IonItem>
        </IonList>
        <IonList lines="none">
          <IonListHeader>Company</IonListHeader>
          <IonItem>
            <IonIcon slot="start" icon={businessOutline}></IonIcon>
            <IonLabel color={AppColor.TERTIARY}>Schneiders Tech</IonLabel>
            <span className="ion-text-uppercase company-division-title">
              <LsMainChip text="Finance" color={AppColor.SECONDARY} />
            </span>
          </IonItem>
        </IonList>
        <IonList lines="none">
          {isAuthenticated ? renderMenuItems(appPages().authenticated, '') : renderMenuItems(appPages().unauthenticated, '')}
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.userReducer.darkMode,
    isAuthenticated: state.userReducer.isLoggedIn,
    menuEnabled: state.sessionsReducer.menuEnabled
  }),
  mapDispatchToProps: ({
    setDarkMode
  }),
  component: withRouter(LsMenu)
});
