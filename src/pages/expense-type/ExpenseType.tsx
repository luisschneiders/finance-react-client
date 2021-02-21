import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { toast } from '../../components/toast/Toast';
import { connect } from '../../data/connect';
import { AppColor } from '../../enum/AppColor';
import { StatusColor } from '../../enum/StatusColor';
import { UserProfileServer } from '../../models/UserProfileServer';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import { PageSize } from '../../enum/PageSize';
import LsListInfiniteScroll from '../../components/list/ListInfiniteScroll';
import LsListItemExpenseType from '../../components/list/ListItemExpenseType';
import {
  saveExpenseType,
  setExpenseTypeList
} from '../../data/expenseType/expenseType.actions';

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
}

interface DispatchProps {
  setExpenseTypeList: typeof setExpenseTypeList;
  saveExpenseType: typeof saveExpenseType;
}

interface ExpensesTypeProps extends StateProps, DispatchProps {}

const ExpenseTypePage: React.FC<ExpensesTypeProps> = ({
  isLoggedIn,
  userProfileServer,
  setExpenseTypeList,
  saveExpenseType,
}) => {
  const [busy, setBusy] = useState(false);
  const [expenseTypeDescription, setExpenseTypeDescription] = useState<string>('');
  // const [page, setPage] = useState<number>(1);
  // const [pageSize, setPageSize] = useState<PageSize>(PageSize.S_12);
  
  useEffect(() => {
    if (isLoggedIn && userProfileServer) {
      setExpenseTypeList(userProfileServer.userId, 1, PageSize.S_12);
    }
  }, [isLoggedIn, userProfileServer, setExpenseTypeList]);

  const expenseTypeForm = async(e: React.FormEvent) => {
    e.preventDefault();
    
    if (!expenseTypeDescription) {
      return toast('Description is required!', StatusColor.WARNING);
    }
    setBusy(true);
    saveExpenseType({expenseTypeDescription});
    setBusy(false);
    setExpenseTypeDescription('');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Expense Categories</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <form noValidate onSubmit={expenseTypeForm}>
            <IonList>
              <IonItem>
                <IonInput name="expenseTypeDescription"
                        type="text"
                        placeholder="Add new expense here" 
                        value={expenseTypeDescription} spellCheck={false} autocapitalize="off"
                        onIonChange={(e: any) => setExpenseTypeDescription(e.detail.value!)}
                        required />
                <div slot="end">
                  <IonButton type="submit" size="small" fill="solid" shape="round" color={AppColor.SUCCESS}>Save</IonButton>
                </div>
              </IonItem>
            </IonList>
          </form>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={busy}></IonLoading>
      <IonContent className="ion-padding"> 
        <LsListInfiniteScroll>
          <LsListItemExpenseType />
        </LsListInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
  }),
  mapDispatchToProps: ({
    setExpenseTypeList,
    saveExpenseType,
  }),
  component: React.memo(ExpenseTypePage)
});
