import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { toast } from '../../components/toast/Toast';
import { connect } from '../../data/connect';
import { saveExpenseType, setExpenseType } from '../../data/expenseType/expenseType.actions';
import { AppColor } from '../../enum/AppColor';
import { StatusColor } from '../../enum/StatusColor';
import { ExpenseType } from '../../models/ExpenseType';
import { UserProfileServer } from '../../models/UserProfileServer';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
}

interface DispatchProps {
  setExpenseType: typeof setExpenseType;
  saveExpenseType: typeof saveExpenseType;
}

interface ExpensesTypeProps extends OwnProps, StateProps, DispatchProps {}

const ExpenseTypePage: React.FC<ExpensesTypeProps> = ({
  isLoggedIn,
  userProfileServer,
  setExpenseType,
  saveExpenseType,
}) => {
  const [busy, setBusy] = useState(false);
  const [expenseTypeDescription, setExpenseTypeDescription] = useState<string>('');

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

  if (isLoggedIn && userProfileServer) {
    setExpenseType(userProfileServer.userId);
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
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={busy}></IonLoading>
      <IonContent className="ion-padding">
        <form noValidate onSubmit={expenseTypeForm}>
          <IonList>
            <IonListHeader lines="full">
              <IonInput name="expenseTypeDescription"
                        type="text"
                        placeholder="Enter description" 
                        value={expenseTypeDescription} spellCheck={false} autocapitalize="off"
                        onIonChange={(e: any) => setExpenseTypeDescription(e.detail.value!)}
                        required />
              <IonButton type="submit" size="small" fill="solid" shape="round" color={AppColor.SUCCESS}>Save</IonButton>
            </IonListHeader>
            
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
  }),
  mapDispatchToProps: {
    setExpenseType,
    saveExpenseType,
  },
  component: ExpenseTypePage
});
