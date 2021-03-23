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
import { addBank, setBankModalShow } from '../../data/bank/bank.actions';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsBank from '../../data/bank/bank.selectors';

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
  showBankModal: boolean;
}

interface DispatchProps {
  setBankModalShow: typeof setBankModalShow;
  addBank: typeof addBank;
}

interface ModalBankProps extends StateProps, DispatchProps {}

const LsModalBank: React.FC<ModalBankProps> = ({
    isLoggedIn,
    userProfileServer,
    showBankModal,
    setBankModalShow,
    addBank,
  }) => {

  const { showModal, isSubmitting, handleShow, handleClose } = useModal();

  const [bankDescription, setBankDescription] = useState<string>('');
  const [bankAccount, setBankAccount] = useState<string>('');
  const [bankCurrentBalance, setBankCurrentBalance] = useState<number>();

  useEffect(() => {
    if (showBankModal) {
      handleShow();
      setBankModalShow(false);
    }
  }, [isLoggedIn, userProfileServer, showBankModal, setBankModalShow, handleShow])

  const bankForm = async(e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bankDescription) {
      return toast('Description is required!', StatusColor.WARNING);
    }

    if (!bankAccount) {
      return toast('Account is required!', StatusColor.WARNING);
    }

    if (!bankCurrentBalance) {
      return toast('Current balance is required!', StatusColor.WARNING);
    }

    if (!isLoggedIn && !userProfileServer) {
      return toast('Could not find user!', StatusColor.WARNING);
    }

    addBank({
      bankDescription,
      bankAccount,
      bankCurrentBalance,
      bankInsertedBy: userProfileServer.userId,
      bankIsActive: true
    });
    setBankDescription('');
    setBankAccount('');
    setBankCurrentBalance(undefined);
    handleClose();
  }

  return (
    <ModalProvider>
      <LsMainModal
        id="bank"
        show={showModal}
        title="New bank"
        isSubmitting={isSubmitting}
        closeModal={handleClose}
      >
        <form noValidate onSubmit={bankForm}>
          <IonItem>
            <IonLabel position="stacked">Bank</IonLabel>
            <IonInput
              name="bankDescription"
              type="text"
              value={bankDescription} spellCheck={false} autocapitalize="off"
              onIonChange={(e: any) => setBankDescription(e.detail.value!)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Account</IonLabel>
            <IonInput
              name="bankAccount"
              type="text"
              value={bankAccount} spellCheck={false} autocapitalize="off"
              onIonChange={(e: any) => setBankAccount(e.detail.value!)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Current balance</IonLabel>
            <IonInput
              type="number"
              step="0.01"
              name="bankCurrentBalance"
              value={bankCurrentBalance}
              onIonChange={(e: any) => setBankCurrentBalance(e.detail.value!)}
              min="0"
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
    showBankModal: selectorsBank.showBankModal(state),
  }),
  mapDispatchToProps: ({
    setBankModalShow,
    addBank,
  }),
  component: LsModalBank
});
