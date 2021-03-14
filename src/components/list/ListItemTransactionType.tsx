import React, { useEffect, useState } from 'react';
import {
  IonLabel,
  IonItem,
  IonList,
  IonButton,
  IonToggle,
} from '@ionic/react';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsTransactionType from '../../data/transactionType/transactionType.selectors';
import { TransactionType, TransactionTypeList } from '../../models/TransactionType';
import { AppColor } from '../../enum/AppColor';
import { StatusColor } from '../../enum/StatusColor';
import {
  setTransactionTypeList,
  updateTransactionType
} from '../../data/transactionType/transactionType.actions';
import { UserProfileServer } from '../../models/UserProfileServer';
import { PageSize } from '../../enum/PageSize';
import LsMainCard from '../card/MainCard';
import * as ROUTES from '../../constants/Routes';

interface StateProps {
  isLoggedIn: boolean;
  isFetching: boolean;
  userProfileServer: UserProfileServer;
  transactionTypeList: TransactionTypeList;
}

interface DispatchProps {
  setTransactionTypeList: typeof setTransactionTypeList;
  updateTransactionType: typeof updateTransactionType;
}

interface ListTransactionTypeProps extends StateProps, DispatchProps {}

const LsListItemTransactionType: React.FC<ListTransactionTypeProps> = ({
    isLoggedIn,
    isFetching,
    userProfileServer,
    transactionTypeList,
    setTransactionTypeList,
    updateTransactionType,
  }) => {
  const [transactionType, setTransactionType] = useState<TransactionType[]>([]);

  useEffect(() => {
    if (transactionTypeList) {
      setTransactionType(transactionTypeList.transactionsType);
    }
  }, [transactionTypeList, isFetching]);

  const loadMore = () => {
    if (isLoggedIn && userProfileServer) {
      let newPage: number = transactionTypeList.pagination.page;
      ++newPage;
      setTransactionTypeList(userProfileServer.userId, newPage, PageSize.S_12);
    }
  };

  const changeStatus = async (transactionType: TransactionType) => {
    if (transactionType) {
      const newTransactionType: TransactionType = transactionType;
      newTransactionType.transactionTypeIsActive = !transactionType.transactionTypeIsActive

      updateTransactionType(newTransactionType);
    }
  }
  
  return (
    <>
      {transactionType && transactionType.length > 0 &&
        <IonList lines="full">
          {transactionType.map((item: TransactionType, index: number) => (
            <IonItem key={index}>
              <IonLabel>
                <IonItem
                  className="ion-text-uppercase"
                  lines="none"
                  routerLink={`${ROUTES.SETUP_TRANSACTION_TYPE}/${item.transactionTypeId}`}
                >
                  <IonLabel slot="start" color={item.transactionTypeIsActive ? StatusColor.SUCCESS : StatusColor.DEFAULT}>
                    {item.transactionTypeDescription}
                  </IonLabel>
                  <IonLabel slot="end" color={item.transactionTypeIsActive ? StatusColor.SUCCESS : StatusColor.DEFAULT}>
                    {item.transactionTypeAction}
                  </IonLabel>
                </IonItem>
              </IonLabel>
              <div slot="end">
                <IonToggle color={StatusColor.SUCCESS} checked={item.transactionTypeIsActive} onClick={() => changeStatus(item)} />
              </div>
            </IonItem>
          ))}
        </IonList>
      }
      {transactionType && transactionType.length > 0 && (transactionTypeList.pagination.pageCount > transactionTypeList.pagination.page) &&
        <div className="ion-text-center">
          <IonButton fill="clear" color={AppColor.TERTIARY} disabled={isFetching} onClick={loadMore}>Load more...</IonButton>
        </div>
      }
      {!transactionType.length && 
        <LsMainCard color={StatusColor.WARNING} message="No records found!"></LsMainCard>
      }
    </>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isFetching: selectorsTransactionType.isFetchingTransactionTypeList(state),
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
    transactionTypeList: selectorsTransactionType.getTransactionTypeList(state),
  }),
  mapDispatchToProps: ({
    setTransactionTypeList,
    updateTransactionType,
  }),
  component: LsListItemTransactionType
});
