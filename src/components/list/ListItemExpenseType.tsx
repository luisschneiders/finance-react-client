import React, { useEffect, useState } from 'react';
import {
  IonLabel,
  IonItem,
  IonList,
  IonButton,
} from '@ionic/react';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsExpenseType from '../../data/expenseType/expenseType.selectors';
import { ExpenseType, ExpenseTypeList } from '../../models/ExpenseType';
import { AppColor } from '../../enum/AppColor';
import { StatusColor } from '../../enum/StatusColor';
import LsMainChip from '../chip/MainChip';
import {
  setExpenseTypeList
} from '../../data/expenseType/expenseType.actions';
import { UserProfileServer } from '../../models/UserProfileServer';
import { PageSize } from '../../enum/PageSize';
import LsMainCard from '../card/MainCard';

interface StateProps {
  isLoggedIn: boolean;
  isFetching: boolean;
  userProfileServer: UserProfileServer;
  expenseTypeList: ExpenseTypeList;
}

interface DispatchProps {
  setExpenseTypeList: typeof setExpenseTypeList;
}

interface ListExpensesTypeProps extends StateProps, DispatchProps {}

const LsListItemExpenseType: React.FC<ListExpensesTypeProps> = ({
    isLoggedIn,
    isFetching,
    userProfileServer,
    expenseTypeList,
    setExpenseTypeList,
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
      setExpenseTypeList(userProfileServer.userId, newPage, PageSize.S_12);
    }
  };
  
  return (
    <>
      {expenseType && expenseType.length > 0 &&
        <IonList lines="full">
          {expenseType.map((item: ExpenseType, index: number) => (
            <IonItem key={index}>
              <IonLabel color={item.expenseTypeIsActive ? AppColor.DARK : AppColor.MEDIUM}>
                {item.expenseTypeDescription}
              </IonLabel>
              <div slot="end">
                <LsMainChip color={item.expenseTypeIsActive ? StatusColor.SUCCESS : StatusColor.DEFAULT} text={item.expenseTypeIsActive ? 'Active' : 'Inactive'}/>
              </div>
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
  }),
  component: LsListItemExpenseType
});
