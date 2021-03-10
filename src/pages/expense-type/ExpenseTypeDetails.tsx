import React, { useEffect, useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTitle,
  IonButton,
  IonList,
} from '@ionic/react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router';
import { connect } from '../../data/connect';
import * as ROUTES from '../../constants/Routes';
import { ExpenseType } from '../../models/ExpenseType';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsExpenseType from '../../data/expenseType/expenseType.selectors';
import { AppColor } from '../../enum/AppColor';
import { StatusColor } from '../../enum/StatusColor';
import { toast } from '../../components/toast/Toast';
import { setExpenseTypeById, updateExpenseType } from '../../data/expenseType/expenseType.actions';
import { UserProfileServer } from '../../models/UserProfileServer';

interface OwnProps extends RouteComponentProps<{
  id: string;
}>{}

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
  expenseType: ExpenseType | undefined;
  expenseTypeById: ExpenseType;
};

interface DispatchProps {
  setExpenseTypeById: typeof setExpenseTypeById;
  updateExpenseType: typeof updateExpenseType;
};

interface ExpenseTypeDetailsProps extends OwnProps, StateProps, DispatchProps {};

const ExpenseTypeDetailsPage: React.FC<ExpenseTypeDetailsProps> = ({
    isLoggedIn,
    userProfileServer,
    match,
    expenseType,
    expenseTypeById,
    setExpenseTypeById,
    updateExpenseType,
  }) => {

    const [expenseTypeDescription, setExpenseTypeDescription] = useState<string>('');
    const [isById, setIsById] = useState<boolean>(false);

    useEffect(() => {
      if (isLoggedIn && userProfileServer) {
        // If user refresh the page, fetch the expense by id only once
        if (!expenseType && !isById) {
          setExpenseTypeById(userProfileServer.userId, parseInt(match.params.id));
          setIsById(true);
        }
      }

      if (expenseType) {
        setExpenseTypeDescription(expenseType.expenseTypeDescription);
      } else if (expenseTypeById) {
        setExpenseTypeDescription(expenseTypeById.expenseTypeDescription);
      }

    }, [
      isLoggedIn,
      userProfileServer,
      expenseType,
      match,
      expenseTypeById,
      setExpenseTypeById,
      isById,
    ]);

    const formExpenseType = async (e: React.FormEvent) => {
      e.preventDefault();

      if (expenseTypeDescription.trim() === '') {
        return toast('Description is required!', StatusColor.WARNING);
      }

      const newExpenseType: any = expenseType || expenseTypeById;
      newExpenseType.expenseTypeDescription = expenseTypeDescription

      updateExpenseType(newExpenseType);
    }

  return (
    <IonPage id="news-details-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={ROUTES.SETUP_EXPENSE_TYPE}></IonBackButton>
          </IonButtons>
          <IonTitle className="ion-text-capitalize">
            Update <span className="ion-text-underline"> {expenseTypeDescription}</span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={formExpenseType}>
          <IonList>
            <IonItem lines="full" disabled={!expenseType && !expenseTypeById}>
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Description</IonLabel>
              <IonInput name="expenseTypeDescription" type="text"
                        value={expenseTypeDescription} spellCheck={false} autocapitalize="off"
                        onIonChange={(e: any) => setExpenseTypeDescription(e.detail.value!)} required>
              </IonInput>
            </IonItem>
            <IonItem lines="none" disabled={!expenseType && !expenseTypeById}>
              <div slot="end">
                <IonButton type="submit" fill="outline" >Update</IonButton>
              </div>
            </IonItem>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
    expenseType: selectorsExpenseType.getExpenseTypeFromList(state, OwnProps),
    expenseTypeById: selectorsExpenseType.getExpenseType(state),
  }),
  mapDispatchToProps: ({
    setExpenseTypeById,
    updateExpenseType,
  }),
  component: withRouter(ExpenseTypeDetailsPage)
});
