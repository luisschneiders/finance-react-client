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
import * as selectorsExpenseType from '../../data/expenseType/expenseType.selectors';
import { PageSize } from '../../enum/PageSize';
import LsListItemExpenseType from '../../components/list/ListItemExpenseType';
import {
  addExpenseType,
  setExpenseTypeList
} from '../../data/expenseType/expenseType.actions';
import { ModalProvider } from '../../components/modal/ModalProvider';
import { add } from 'ionicons/icons';
import { useModal } from '../../hooks/useModal';
import LsMainModal from '../../components/modal/MainModal';

interface StateProps {
  isLoggedIn: boolean;
  isSaving: boolean;
  isFetching: boolean;
  userProfileServer: UserProfileServer;
}

interface DispatchProps {
  setExpenseTypeList: typeof setExpenseTypeList;
  addExpenseType: typeof addExpenseType;
}

interface ExpensesTypeProps extends StateProps, DispatchProps {}

const ExpenseTypePage: React.FC<ExpensesTypeProps> = ({
  isLoggedIn,
  isFetching,
  isSaving,
  userProfileServer,
  setExpenseTypeList,
  addExpenseType,
}) => {
  const { showModal, isSubmitting, handleShow, handleClose } = useModal();

  const [expenseTypeDescription, setExpenseTypeDescription] = useState<string>('');
  
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
    addExpenseType({
      expenseTypeDescription,
      expenseTypeInsertedBy: userProfileServer.userId,
      expenseTypeIsActive: true
    });
    setExpenseTypeDescription('');
    handleClose();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Expense Categories</IonTitle>
          <IonFab vertical="center" horizontal="end">
            <IonFabButton color={AppColor.TERTIARY} size="small" title="Add new record">
              <IonIcon 
                icon={add}
                onClick={() => handleShow()}
                size="small"
              />
            </IonFabButton>
          </IonFab>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={isFetching}></IonLoading>
      <IonContent className="ion-padding">
        <LsListItemExpenseType />
      </IonContent>
      <ModalProvider>
      <LsMainModal
        id="transaction-type"
        show={showModal}
        title="New expense category"
        isSubmitting={isSubmitting}
        closeModal={handleClose}
      >
          <form noValidate onSubmit={expenseTypeForm}>
            <IonItem>
              <IonLabel position="stacked">Description</IonLabel>
              <IonInput
                name="expenseTypeDescription"
                type="text"
                value={expenseTypeDescription} spellCheck={false} autocapitalize="off"
                onIonChange={(e: any) => setExpenseTypeDescription(e.detail.value!)}
                required
              />
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
    isSaving: selectorsExpenseType.isSavingExpenseType(state),
    isFetching: selectorsExpenseType.isFetchingExpenseTypeList(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
  }),
  mapDispatchToProps: ({
    setExpenseTypeList,
    addExpenseType,
  }),
  component: React.memo(ExpenseTypePage)
});
