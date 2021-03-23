import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
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
import { setModalExpenseTypeShow } from '../../data/modal/modal.actions';
import { addExpenseType } from '../../data/expenseType/expenseType.actions';

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
  isShowModalExpenseType: boolean;
}

interface DispatchProps {
  setModalExpenseTypeShow: typeof setModalExpenseTypeShow;
  addExpenseType: typeof addExpenseType;
}

interface ModalExpenseTypeProps extends StateProps, DispatchProps {}

const LsModalExpenseType: React.FC<ModalExpenseTypeProps> = ({
    isLoggedIn,
    userProfileServer,
    isShowModalExpenseType,
    setModalExpenseTypeShow,
    addExpenseType,
  }) => {

  const { showModal, isSubmitting, handleShow, handleClose } = useModal();

  const [expenseTypeDescription, setExpenseTypeDescription] = useState<string>('');

  useEffect(() => {
    if (isShowModalExpenseType) {
      handleShow();
      setModalExpenseTypeShow(false);
    }
  }, [
    isLoggedIn,
    userProfileServer,
    isShowModalExpenseType,
    setModalExpenseTypeShow,
    handleShow
  ])

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
    <ModalProvider>
      <LsMainModal
        id="modal-expenseType"
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
    isShowModalExpenseType: selectorsModal.showModalExpenseType(state),
  }),
  mapDispatchToProps: ({
    setModalExpenseTypeShow,
    addExpenseType,
  }),
  component: LsModalExpenseType
});
