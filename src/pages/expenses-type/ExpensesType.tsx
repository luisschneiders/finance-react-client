import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from '../../data/connect';

interface OwnProps extends RouteComponentProps {}

interface StateProps {}

interface DispatchProps {}

interface ExpensesTypeProps extends OwnProps, StateProps, DispatchProps {}

const ExpensesTypePage: React.FC<ExpensesTypeProps> = ({

}) => {
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
      <IonContent>

      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({}),
  mapDispatchToProps: {},
  component: ExpensesTypePage
});
