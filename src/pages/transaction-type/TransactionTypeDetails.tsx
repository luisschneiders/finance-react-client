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
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router';
import { connect } from '../../data/connect';
import * as ROUTES from '../../constants/Routes';
import { TransactionType } from '../../models/TransactionType';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsTransactionType from '../../data/transactionType/transactionType.selectors';
import { AppColor } from '../../enum/AppColor';
import { StatusColor } from '../../enum/StatusColor';
import { toast } from '../../components/toast/Toast';
import { setTransactionTypeById, updateTransactionType } from '../../data/transactionType/transactionType.actions';
import { UserProfileServer } from '../../models/UserProfileServer';
import { transactionTypeOptions } from './TransactionTypeOptions';

interface OwnProps extends RouteComponentProps<{
  id: string;
}>{}

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
  transactionType: TransactionType | undefined;
  transactionTypeById: TransactionType;
};

interface DispatchProps {
  setTransactionTypeById: typeof setTransactionTypeById;
  updateTransactionType: typeof updateTransactionType;
};

interface TransactionTypeDetailsProps extends OwnProps, StateProps, DispatchProps {};

const TransactionTypeDetailsPage: React.FC<TransactionTypeDetailsProps> = ({
    isLoggedIn,
    userProfileServer,
    match,
    transactionType,
    transactionTypeById,
    setTransactionTypeById,
    updateTransactionType,
  }) => {

    const [transactionTypeDescription, setTransactionTypeDescription] = useState<string>('');
    const [transactionTypeActions, setTransactionTypeActions] = useState<any[]>([]);
    const [transactionTypeAction, setTransactionTypeAction] = useState<string>('');

    const [isById, setIsById] = useState<boolean>(false);

    const transactionActionsOptions = async () => {
      const actions = transactionTypeOptions();
      setTransactionTypeActions(await actions);
    }

    useEffect(() => {
      transactionActionsOptions();
      if (isLoggedIn && userProfileServer) {
        // If user refresh the page, fetch the Transaction by id only once
        if (!transactionType && !isById) {
          setTransactionTypeById(userProfileServer.userId, parseInt(match.params.id));
          setIsById(true);
        }
      }

      if (transactionType) {
        setTransactionTypeDescription(transactionType.transactionTypeDescription);
        setTransactionTypeAction(transactionType.transactionTypeAction);
      } else if (transactionTypeById) {
        setTransactionTypeDescription(transactionTypeById.transactionTypeDescription);
        setTransactionTypeAction(transactionTypeById.transactionTypeAction);
      }

    }, [
      isLoggedIn,
      userProfileServer,
      transactionType,
      match,
      transactionTypeById,
      setTransactionTypeById,
      isById,
    ]);

    const formTransactionType = async (e: React.FormEvent) => {
      e.preventDefault();

      if (transactionTypeDescription.trim() === '') {
        return toast('Description is required!', StatusColor.WARNING);
      }
      if (transactionTypeAction === '') {
        return toast('Action is required!', StatusColor.WARNING);
      }

      const newTransactionType: TransactionType = transactionType || transactionTypeById;
      newTransactionType.transactionTypeDescription = transactionTypeDescription;
      newTransactionType.transactionTypeAction = transactionTypeAction;

      updateTransactionType(newTransactionType);
    }

  return (
    <IonPage id="transaction-type-details-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={ROUTES.TABS_TRANSACTION_TYPE}></IonBackButton>
          </IonButtons>
          <IonTitle className="ion-text-capitalize">
            Update <span className="ion-text-underline"> {transactionTypeDescription}</span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={formTransactionType}>
          <IonList>
            <IonItem lines="full" disabled={!transactionType && !transactionTypeById}>
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Description</IonLabel>
              <IonInput name="transactionTypeDescription" type="text"
                        value={transactionTypeDescription} spellCheck={false} autocapitalize="off"
                        onIonChange={(e: any) => setTransactionTypeDescription(e.detail.value!)} required>
              </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Action</IonLabel>
              <IonSelect
                onIonChange={e => setTransactionTypeAction(e.detail.value)}
                value={transactionTypeAction}
              >
                {transactionTypeActions.map((option: any, index: number) => (
                  <IonSelectOption 
                    key={index}
                    value={option.value}
                  >
                    {option.description}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem lines="none" disabled={!transactionType && !transactionTypeById}>
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
    transactionType: selectorsTransactionType.getTransactionTypeFromList(state, OwnProps),
    transactionTypeById: selectorsTransactionType.getTransactionType(state),
  }),
  mapDispatchToProps: ({
    setTransactionTypeById,
    updateTransactionType,
  }),
  component: withRouter(TransactionTypeDetailsPage)
});
