import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { toast } from '../../components/toast/Toast';
import { connect } from '../../data/connect';
import { saveExpenseType } from '../../data/expenseType/expenseType.actions';
import { AppColor } from '../../enum/AppColor';
import { StatusColor } from '../../enum/StatusColor';
import { ExpenseType } from '../../models/ExpenseType';

interface OwnProps extends RouteComponentProps {}

interface StateProps {}

interface DispatchProps {
  saveExpenseType: typeof saveExpenseType;
}

interface ExpensesTypeProps extends OwnProps, StateProps, DispatchProps {}

const ExpenseTypePage: React.FC<ExpensesTypeProps> = ({
  saveExpenseType
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
      <IonContent>
        <form noValidate onSubmit={expenseTypeForm}>
          <IonList>
            <IonItem>
              {/* <IonLabel color={AppColor.PRIMARY}>Expense Description</IonLabel> */}
              <IonInput name="expenseTypeDescription"
                        type="text"
                        placeholder="Enter description" 
                        value={expenseTypeDescription} spellCheck={false} autocapitalize="off"
                        onIonChange={(e: any) => setExpenseTypeDescription(e.detail.value!)}
                        required />
              <IonButton type="submit" fill="solid" shape="round" color={AppColor.SUCCESS} slot="end">Save</IonButton>
            </IonItem>
          </IonList>

        </form>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({}),
  mapDispatchToProps: {
    saveExpenseType
  },
  component: ExpenseTypePage
});
