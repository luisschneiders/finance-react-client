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
import * as selectorsBank from '../../data/bank/bank.selectors';
import { Bank, BankList } from '../../models/Bank';
import { AppColor } from '../../enum/AppColor';
import { StatusColor } from '../../enum/StatusColor';
import {
  setBankList,
  updateBank
} from '../../data/bank/bank.actions';
import { UserProfileServer } from '../../models/UserProfileServer';
import { PageListItem } from '../../enum/PageListItem';
import LsMainCard from '../card/MainCard';
import * as ROUTES from '../../constants/Routes';
import { currencyMask } from '../../util/currencyMask';

interface StateProps {
  isLoggedIn: boolean;
  isFetching: boolean;
  userProfileServer: UserProfileServer;
  bankList: BankList;
}

interface DispatchProps {
  setBankList: typeof setBankList;
  updateBank: typeof updateBank;
}

interface ListBankProps extends StateProps, DispatchProps {}

const LsListItemBank: React.FC<ListBankProps> = ({
    isLoggedIn,
    isFetching,
    userProfileServer,
    bankList,
    setBankList,
    updateBank,
  }) => {
  const [bank, setBank] = useState<Bank[]>([]);

  useEffect(() => {
    if (bankList) {
      setBank(bankList.banks);
    }
  }, [bankList, isFetching]);

  const loadMore = () => {
    if (isLoggedIn && userProfileServer) {
      let newPage: number = bankList.pagination.page;
      ++newPage;
      setBankList(userProfileServer.userId, newPage, PageListItem.ITEM_12);
    }
  };

  const changeStatus = async (bank: Bank) => {
    if (bank) {
      const newBank: Bank = bank;
      newBank.bankIsActive = !bank.bankIsActive

      updateBank(newBank);
    }
  }
  
  return (
    <>
      {bank && bank.length > 0 &&
        <IonList lines="full">
          {bank.map((item: Bank, index: number) => (
            <IonItem key={index}>
              <IonLabel>
                <IonItem
                  className="ion-text-uppercase"
                  lines="none"
                  routerLink={`${ROUTES.TABS_BANK}/${item.bankId}`}
                >
                  <IonLabel>
                    <div className="ion-text-capitalize">Bank: </div>
                    <div className={item.bankIsActive ? StatusColor.IS_ACTIVE : StatusColor.IS_INACTIVE}>
                      {item.bankDescription}
                    </div>
                  </IonLabel>
                  <IonLabel>
                    <div className="ion-text-capitalize">Account: </div>
                    <div className={item.bankIsActive ? StatusColor.IS_ACTIVE : StatusColor.IS_INACTIVE}>
                      {item.bankAccount}
                    </div>
                  </IonLabel>
                  <IonLabel>
                    <div className="ion-text-capitalize">Current balance: </div>
                    <div className={item.bankIsActive ? StatusColor.IS_ACTIVE : StatusColor.IS_INACTIVE}>
                      {currencyMask('en-AU', item.bankCurrentBalance, 'AUD')}
                    </div>
                  </IonLabel>
                </IonItem>
              </IonLabel>
              <div slot="end">
                <IonToggle color={StatusColor.SUCCESS} checked={item.bankIsActive} onClick={() => changeStatus(item)} />
              </div>
            </IonItem>
          ))}
        </IonList>
      }
      {bank && bank.length > 0 && (bankList.pagination.pageCount > bankList.pagination.page) &&
        <div className="ion-text-center">
          <IonButton fill="clear" color={AppColor.TERTIARY} disabled={isFetching} onClick={loadMore}>Load more...</IonButton>
        </div>
      }
      {!bank.length && 
        <LsMainCard color={StatusColor.WARNING} message="No records found!"></LsMainCard>
      }
    </>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isFetching: selectorsBank.isFetchingBankList(state),
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
    bankList: selectorsBank.getBankList(state),
  }),
  mapDispatchToProps: ({
    setBankList,
    updateBank,
  }),
  component: LsListItemBank
});
