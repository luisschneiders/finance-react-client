import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonSelect,
  IonSelectOption,
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
import * as selectorsTransactionType from '../../data/transactionType/transactionType.selectors';
import { PageSize } from '../../enum/PageSize';
import LsListItemTransactionType from '../../components/list/ListItemTransactionType';
import {
  addTransactionType,
  setTransactionTypeList
} from '../../data/transactionType/transactionType.actions';
import { add } from 'ionicons/icons';
import LsMainModal from '../../components/modal/MainModal';
import { ModalProvider } from '../../components/modal/ModalProvider';
import { useModal } from '../../hooks/useModal';
import { transactionTypeOptions } from './TransactionTypeOptions';

interface StateProps {
  isLoggedIn: boolean;
  isSaving: boolean;
  isFetching: boolean;
  userProfileServer: UserProfileServer;
}

interface DispatchProps {
  setTransactionTypeList: typeof setTransactionTypeList;
  addTransactionType: typeof addTransactionType;
}

interface TransactionTypeProps extends StateProps, DispatchProps {}

const TransactionTypePage: React.FC<TransactionTypeProps> = ({
  isLoggedIn,
  isFetching,
  isSaving,
  userProfileServer,
  setTransactionTypeList,
  addTransactionType,
}) => {

  const { showModal, isSubmitting, handleShow, handleClose } = useModal();

  const [transactionTypeDescription, setTransactionTypeDescription] = useState<string>('');
  const [transactionTypeAction, setTransactionTypeAction] = useState<string>('');
  const [transactionTypeActions, setTransactionTypeActions] = useState<any[]>([]);

  const transactionActionsOptions = async () => {
    const actions = transactionTypeOptions();
    setTransactionTypeActions(await actions);
  }
 
  useEffect(() => {
    if (isLoggedIn && userProfileServer) {
      setTransactionTypeList(userProfileServer.userId, 1, PageSize.S_12);
    }
  }, [isLoggedIn, userProfileServer, setTransactionTypeList]);

  const transactionTypeForm = async(e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transactionTypeDescription) {
      return toast('Description is required!', StatusColor.WARNING);
    }
    if (!transactionTypeAction) {
      return toast('Action is required!', StatusColor.WARNING);
    }
    addTransactionType({
      transactionTypeDescription,
      transactionTypeAction,
      transactionTypeInsertedBy: userProfileServer.userId,
      transactionTypeIsActive: true
    });
    setTransactionTypeDescription('');
    handleClose();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Transactions Categories</IonTitle>
          <IonFab vertical="center" horizontal="end">
            <IonFabButton color={AppColor.TERTIARY} size="small" title="Add new record">
              <IonIcon
                icon={add}
                onClick={() => [handleShow(), transactionActionsOptions()]}
                size="small"
              />
            </IonFabButton>
          </IonFab>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={isFetching}></IonLoading>
      <IonContent className="ion-padding">
        <LsListItemTransactionType />
      </IonContent>
      <ModalProvider>
        <LsMainModal
          id="transaction-type"
          show={showModal}
          title="New transaction category"
          isSubmitting={isSubmitting}
          closeModal={handleClose}
        >
          <form noValidate onSubmit={transactionTypeForm}>
            <IonItem>
              <IonLabel position="stacked">Description</IonLabel>
              <IonInput
                name="transactionTypeDescription"
                type="text"
                value={transactionTypeDescription} spellCheck={false} autocapitalize="off"
                onIonChange={(e: any) => setTransactionTypeDescription(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Action</IonLabel>
              <IonSelect onIonChange={e => setTransactionTypeAction(e.detail.value)}>
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
            <IonItem lines="none">
              <div slot="end" className="ion-padding-vertical">
                <IonButton
                  type="submit"
                  fill="outline"
                  color={AppColor.SUCCESS}
                  disabled={isSaving}
                >
                  Save
                </IonButton>
              </div>
            </IonItem>
          </form>
        </LsMainModal>
      </ModalProvider>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    isSaving: selectorsTransactionType.isSavingTransactionType(state),
    isFetching: selectorsTransactionType.isFetchingTransactionTypeList(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
  }),
  mapDispatchToProps: ({
    setTransactionTypeList,
    addTransactionType,
  }),
  component: React.memo(TransactionTypePage)
});
