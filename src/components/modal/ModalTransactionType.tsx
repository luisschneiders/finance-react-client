import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { AppColor } from '../../enum/AppColor';
import { ModalProvider } from './ModalProvider';
import LsMainModal from './MainModal';
import { toast } from '../toast/Toast';
import { StatusColor } from '../../enum/StatusColor';
import { useModal } from '../../hooks/useModal';
import { UserProfileServer } from '../../models/UserProfileServer';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsModal from '../../data/modal/modal.selectors';
import { setModalTransactionTypeShow } from '../../data/modal/modal.actions';
import { addTransactionType } from '../../data/transactionType/transactionType.actions';
import { transactionTypeOptions } from '../../pages/transaction-type/TransactionTypeOptions';

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
  isShowModalTransactionType: boolean;
}

interface DispatchProps {
  setModalTransactionTypeShow: typeof setModalTransactionTypeShow;
  addTransactionType: typeof addTransactionType;
}

interface ModalTransactionTypeProps extends StateProps, DispatchProps {}

const LsModalTransactionType: React.FC<ModalTransactionTypeProps> = ({
    isLoggedIn,
    userProfileServer,
    isShowModalTransactionType,
    setModalTransactionTypeShow,
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
    if (isShowModalTransactionType) {
      handleShow();
      transactionActionsOptions();
      setModalTransactionTypeShow(false);
    }
  }, [
    isLoggedIn,
    userProfileServer,
    isShowModalTransactionType,
    setModalTransactionTypeShow,
    handleShow
  ])

  const transactionTypeForm = async (e: React.FormEvent) => {
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
    <ModalProvider>
      <LsMainModal
        id="modal-transactionType"
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
              >
                Save
              </IonButton>
            </div>
          </IonItem>
        </form>
      </LsMainModal>
    </ModalProvider>
  );
}

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
    isShowModalTransactionType: selectorsModal.showModalTransactionType(state),
  }),
  mapDispatchToProps: ({
    setModalTransactionTypeShow,
    addTransactionType,
  }),
  component: LsModalTransactionType
});
