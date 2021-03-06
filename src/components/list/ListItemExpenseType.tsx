import React, { useEffect, useState } from 'react';
import {
  IonLabel,
  IonItem,
  IonList,
  IonButton,
  IonToggle,
  IonAvatar,
  IonIcon,
} from '@ionic/react';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsExpenseType from '../../data/expenseType/expenseType.selectors';
import { ExpenseType, ExpenseTypeList } from '../../models/ExpenseType';
import { AppColor } from '../../enum/AppColor';
import { StatusColor } from '../../enum/StatusColor';
import {
  setExpenseTypeList,
  updateExpenseType
} from '../../data/expenseType/expenseType.actions';
import { UserProfileServer } from '../../models/UserProfileServer';
import { PageListItem } from '../../enum/PageListItem';
import LsMainCard from '../card/MainCard';
import * as ROUTES from '../../constants/Routes';
import { pricetagOutline } from 'ionicons/icons';

interface StateProps {
  isLoggedIn: boolean;
  isFetching: boolean;
  userProfileServer: UserProfileServer;
  expenseTypeList: ExpenseTypeList;
}

interface DispatchProps {
  setExpenseTypeList: typeof setExpenseTypeList;
  updateExpenseType: typeof updateExpenseType;
}

interface ListExpensesTypeProps extends StateProps, DispatchProps {}

const LsListItemExpenseType: React.FC<ListExpensesTypeProps> = ({
    isLoggedIn,
    isFetching,
    userProfileServer,
    expenseTypeList,
    setExpenseTypeList,
    updateExpenseType,
  }) => {
  const [expenseType, setExpenseType] = useState<ExpenseType[]>([]);

  useEffect(() => {
    if (expenseTypeList) {
      setExpenseType(expenseTypeList.expensesType);
    }
  }, [expenseTypeList, isFetching]);

  const loadMore = () => {
    if (isLoggedIn && userProfileServer) {
      let newPage: number = expenseTypeList.pagination.page;
      ++newPage;
      setExpenseTypeList(userProfileServer.userId, newPage, PageListItem.ITEM_12);
    }
  };

  const changeStatus = async (expenseType: ExpenseType) => {
    if (expenseType) {
      const newExpenseType: ExpenseType = expenseType;
      newExpenseType.expenseTypeIsActive = !expenseType.expenseTypeIsActive

      updateExpenseType(newExpenseType);
    }
  }
  
  return (
    <>
      {expenseType && expenseType.length > 0 &&
        <IonList lines="full" className="ion-no-padding">
          {expenseType.map((item: ExpenseType, index: number) => (
            <IonItem key={index}>
              <IonLabel>
                <IonItem
                  className="ion-no-padding"
                  lines="none"
                  routerLink={`${ROUTES.TABS_EXPENSE_TYPE}/${item.expenseTypeId}`}
                >
                  <IonAvatar slot="start">
                    <IonIcon size="large" icon={pricetagOutline} color={AppColor.SECONDARY} />
                  </IonAvatar>
                  <IonLabel>
                    <h2>
                      {item.expenseTypeDescription}
                    </h2>
                  </IonLabel>
                </IonItem>
              </IonLabel>
              <IonToggle
                color={StatusColor.SUCCESS}
                checked={item.expenseTypeIsActive}
                onClick={() => changeStatus(item)}
              />
            </IonItem>
          ))}
        </IonList>
      }
      {expenseType && expenseType.length > 0 && (expenseTypeList.pagination.pageCount > expenseTypeList.pagination.page) &&
        <div className="ion-text-center">
          <IonButton fill="clear" color={AppColor.TERTIARY} disabled={isFetching} onClick={loadMore}>Load more...</IonButton>
        </div>
      }
      {!expenseType.length && 
        <LsMainCard color={StatusColor.WARNING} message="No records found!"></LsMainCard>
      }
    </>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isFetching: selectorsExpenseType.isFetchingExpenseTypeList(state),
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
    expenseTypeList: selectorsExpenseType.getExpenseTypeList(state),
  }),
  mapDispatchToProps: ({
    setExpenseTypeList,
    updateExpenseType,
  }),
  component: LsListItemExpenseType
});
