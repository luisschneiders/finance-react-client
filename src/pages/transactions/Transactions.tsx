import React, { useEffect, useState } from 'react';
import './Transactions.scss';
import {
  IonButtons,
  IonCol,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { connect } from '../../data/connect';
import {
  endPeriod,
  startPeriod,
} from '../../util/moment';
import { Period } from '../../models/Period';
import * as MOMENT  from '../../util/moment';
import { UserProfileServer } from '../../models/UserProfileServer';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import { setTransactions } from '../../data/transactions/transactions.actions';
import LsMainTransactions from '../../components/transactions/MainTransactions';
import { add, ellipsisVertical, search } from 'ionicons/icons';
import { AppColor } from '../../enum/AppColor';
import LsTransition from '../../components/time/Transition';
import { setModalTransactionsSearchShow } from '../../data/modal/modal.actions';
import { setTransactionTypeByStatusActive } from '../../data/transactionType/transactionType.actions';
import LsModalTransactionsSearch from '../../components/modal/ModalTransactionsSearch';
import { useWindowSize } from '../../hooks/useWindowSize';
import { MOBILE_VIEW } from '../../constants/App';

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
}

interface DispatchProps {
  setTransactions: typeof setTransactions;
  setModalTransactionsSearchShow: typeof setModalTransactionsSearchShow;
  setTransactionTypeByStatusActive: typeof setTransactionTypeByStatusActive;
}

interface TransactionsProps extends StateProps, DispatchProps {}

const TransactionsPage: React.FC<TransactionsProps> = ({
  isLoggedIn,
  userProfileServer,
  setTransactions,
  setModalTransactionsSearchShow,
  setTransactionTypeByStatusActive,

}) => {
  const [height, width] = useWindowSize();
  const [period, setPeriod] = useState<Period>({
    startDate: startPeriod(MOMENT.currentMonthYYYMMDD),
    endDate: endPeriod(MOMENT.currentMonthYYYMMDD),
  });

  const [isCustomSearch, setIsCustomSearch] = useState<boolean>(false);
  const [customPeriod, setCustomPeriod] = useState<Period>(period);
  const [params, setParams] = useState<string>('all');

  useEffect(() => {
    if (isLoggedIn && userProfileServer) {
      if (!isCustomSearch) {
        setTransactions(userProfileServer.userId, period, params);
      } else {
        setIsCustomSearch(false);
        setPeriod(customPeriod);
      }
    }
  }, [
    isLoggedIn,
    userProfileServer,
    params,
    period,
    isCustomSearch,
    customPeriod,
    setTransactions,
    setTransactionTypeByStatusActive,
  ]);

  return (
    <IonPage id="transactions-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton auto-hide="true"></IonMenuButton>
          </IonButtons>
          {width <= MOBILE_VIEW &&  <IonTitle>Transactions</IonTitle>}
          {width <= MOBILE_VIEW &&
          (isLoggedIn && userProfileServer) &&
          <IonFab vertical="center" horizontal="end">
            <IonFabButton color={AppColor.TERTIARY} size="small">
              <IonIcon icon={ellipsisVertical} />
            </IonFabButton>
            <IonFabList side="start">
              <IonFabButton
                onClick={() => [setModalTransactionsSearchShow(true), setTransactionTypeByStatusActive(userProfileServer.userId)]}
              >
                <IonIcon
                  color={AppColor.TERTIARY}
                  icon={search}
                />
              </IonFabButton>
              <IonFabButton
                onClick={() => [setModalTransactionsSearchShow(true), setTransactionTypeByStatusActive(userProfileServer.userId)]}
              >
                <IonIcon color={AppColor.SUCCESS} icon={add} />
              </IonFabButton>
            </IonFabList>
          </IonFab>}

          {width > MOBILE_VIEW && 
          <IonGrid className="ion-no-padding">
            <IonRow className="ion-no-padding">
              <IonCol size="8" push="2" className="ion-no-padding">
                <LsTransition
                  monthOrYear='month'
                  period={period}
                  setPeriod={setPeriod}
                />
              </IonCol>
              <IonCol className="ion-no-padding">
                <IonFab vertical="center" horizontal="end">
                  <IonFabButton color={AppColor.LIGHT} size="small" title="Search">
                    <IonIcon
                      icon={search}
                      onClick={() => [setModalTransactionsSearchShow(true), setTransactionTypeByStatusActive(userProfileServer.userId)]}
                      size="small"
                    />
                  </IonFabButton>
                </IonFab>
              </IonCol>
              <IonCol className="ion-no-padding">
                <IonFab vertical="center" horizontal="end">
                  <IonFabButton color={AppColor.TERTIARY} size="small" title="Add new record">
                    <IonIcon
                      icon={add}
                      onClick={() => [setModalTransactionsSearchShow(true), setTransactionTypeByStatusActive(userProfileServer.userId)]}
                      size="small"
                    />
                  </IonFabButton>
                </IonFab>
              </IonCol>
            </IonRow>
          </IonGrid>
          }
        </IonToolbar>
        {width <= MOBILE_VIEW && <IonToolbar>
          <LsTransition
            monthOrYear='month'
            period={period}
            setPeriod={setPeriod}
          />
        </IonToolbar>}
      </IonHeader>
      <LsMainTransactions />
      <LsModalTransactionsSearch
        setIsCustomSearch={setIsCustomSearch}
        setCustomPeriod={setCustomPeriod}
        setParams={setParams}
      />
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps> ({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
  }),
  mapDispatchToProps: ({
    setTransactions,
    setModalTransactionsSearchShow,
    setTransactionTypeByStatusActive,
  }),
  component: React.memo(TransactionsPage)
});
