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
import { Bank } from '../../models/Bank';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsBank from '../../data/bank/bank.selectors';
import { AppColor } from '../../enum/AppColor';
import { StatusColor } from '../../enum/StatusColor';
import { toast } from '../../components/toast/Toast';
import { setBankById, updateBank } from '../../data/bank/bank.actions';
import { UserProfileServer } from '../../models/UserProfileServer';

interface OwnProps extends RouteComponentProps<{
  id: string;
}>{}

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
  bank: Bank | undefined;
  bankById: Bank;
};

interface DispatchProps {
  setBankById: typeof setBankById;
  updateBank: typeof updateBank;
};

interface BankDetailsProps extends OwnProps, StateProps, DispatchProps {};

const BankDetailsPage: React.FC<BankDetailsProps> = ({
    isLoggedIn,
    userProfileServer,
    match,
    bank,
    bankById,
    setBankById,
    updateBank,
  }) => {

    const [bankDescription, setBankDescription] = useState<string>('');
    const [bankAccount, setBankAccount] = useState<string>('');
    const [bankInitialBalance, setBankInitialBalance] = useState<number>(0);
    const [bankCurrentBalance, setBankCurrentBalance] = useState<number>(0);

    const [isById, setIsById] = useState<boolean>(false);

    useEffect(() => {

      if (isLoggedIn && userProfileServer) {
        // If user refresh the page, fetch the Bank by id only once
        if (!bank && !isById) {
          setBankById(userProfileServer.userId, parseInt(match.params.id));
          setIsById(true);
        }
      }

      if (bank) {
        setBankDescription(bank.bankDescription);
        setBankAccount(bank.bankAccount);
        setBankInitialBalance(bank.bankInitialBalance);
        setBankCurrentBalance(bank.bankCurrentBalance);
      } else if (bankById) {
        setBankDescription(bankById.bankDescription);
        setBankAccount(bankById.bankAccount);
        setBankInitialBalance(bankById.bankInitialBalance);
        setBankCurrentBalance(bankById.bankCurrentBalance);
      }

    }, [
      isLoggedIn,
      userProfileServer,
      bank,
      match,
      bankById,
      setBankById,
      isById,
    ]);

    const formBank = async (e: React.FormEvent) => {
      e.preventDefault();

      if (bankDescription.trim() === '') {
        return toast('Description is required!', StatusColor.WARNING);
      }

      const newBank: Bank = bank || bankById;
      newBank.bankDescription = bankDescription;
      newBank.bankAccount = bankAccount;
      newBank.bankInitialBalance = bankInitialBalance;
      newBank.bankCurrentBalance = bankCurrentBalance;

      updateBank(newBank);
    }

  return (
    <IonPage id="news-details-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={ROUTES.TABS_BANK}></IonBackButton>
          </IonButtons>
          <IonTitle className="ion-text-capitalize">
            Update <span className="ion-text-underline"> {bankDescription}</span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={formBank}>
          <IonList>
            <IonItem lines="full" disabled={!bank && !bankById}>
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Bank</IonLabel>
              <IonInput
                type="text"
                name="bankDescription"
                value={bankDescription}
                spellCheck={false}
                autocapitalize="off"
                onIonChange={(e: any) => setBankDescription(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem lines="full" disabled={!bank && !bankById}>
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Account</IonLabel>
              <IonInput
                type="text"
                name="bankAccount"
                value={bankAccount}
                spellCheck={false}
                autocapitalize="off"
                onIonChange={(e: any) => setBankAccount(e.detail.value!)}
                required 
              />
            </IonItem>
            <IonItem lines="full" disabled={!bank && !bankById}>
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Initial balance</IonLabel>
              <IonInput
                disabled={true}
                type="number"
                step="0.01"
                name="bankInitialBalance"
                value={bankInitialBalance}
                onIonChange={(e: any) => setBankInitialBalance(e.detail.value!)}
                min="0"
                required 
              />
            </IonItem>
            <IonItem lines="full" disabled={!bank && !bankById}>
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Current balance</IonLabel>
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
            <IonItem lines="none" disabled={!bank && !bankById}>
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
    bank: selectorsBank.getBankFromList(state, OwnProps),
    bankById: selectorsBank.getBank(state),
  }),
  mapDispatchToProps: ({
    setBankById,
    updateBank,
  }),
  component: withRouter(BankDetailsPage)
});
