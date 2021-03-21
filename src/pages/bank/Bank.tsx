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
import * as selectorsBank from '../../data/bank/bank.selectors';
import { PageSize } from '../../enum/PageSize';
import LsListItemBank from '../../components/list/ListItemBank';
import {
  addBank,
  setBankList
} from '../../data/bank/bank.actions';
import { add } from 'ionicons/icons';
import LsMainModal from '../../components/modal/MainModal';
import { ModalProvider } from '../../components/modal/ModalProvider';
import { useModal } from '../../hooks/useModal';

interface StateProps {
  isLoggedIn: boolean;
  isSaving: boolean;
  isFetching: boolean;
  userProfileServer: UserProfileServer;
}

interface DispatchProps {
  setBankList: typeof setBankList;
  addBank: typeof addBank;
}

interface BankProps extends StateProps, DispatchProps {}

const BankPage: React.FC<BankProps> = ({
  isLoggedIn,
  isFetching,
  isSaving,
  userProfileServer,
  setBankList,
  addBank,
}) => {

  const { showModal, isSubmitting, handleShow, handleClose } = useModal();

  const [bankDescription, setBankDescription] = useState<string>('');
  const [bankAccount, setBankAccount] = useState<string>('');
  const [bankCurrentBalance, setBankCurrentBalance] = useState<number>();
  
  useEffect(() => {
    if (isLoggedIn && userProfileServer) {
      setBankList(userProfileServer.userId, 1, PageSize.S_12);
    }
  }, [isLoggedIn, userProfileServer, setBankList]);
  
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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Banks</IonTitle>
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
        <LsListItemBank />
      </IonContent>
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
    isSaving: selectorsBank.isSavingBank(state),
    isFetching: selectorsBank.isFetchingBankList(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
  }),
  mapDispatchToProps: ({
    setBankList,
    addBank,
  }),
  component: React.memo(BankPage)
});
