import React, { useEffect, useState } from 'react';
import { connect } from '../../data/connect';
import { TransactionsGroup } from '../../models/Transactions';
import * as selectorsTransactions from '../../data/transactions/transactions.selectors';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonIcon,
  IonLoading,
  IonToolbar
} from '@ionic/react';
import { AppColor } from '../../enum/AppColor';
import LsMainChip from '../chip/MainChip';
import { add } from 'ionicons/icons';
import { StatusColor } from '../../enum/StatusColor';
import LsMainCard from '../card/MainCard';
import LsGroupExpenses from '../list/GroupExpenses';
import LsGroupTransactions from '../list/GroupTransactions';

interface StateProps {
  transactions: TransactionsGroup | null;
}

interface DispatchProps {}

interface MainTransactionsProps extends StateProps, DispatchProps {}

const LsMainTransactions: React.FC<MainTransactionsProps> = ({
  transactions,
}) => {

  const [hasRecord, setHasRecord] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  useEffect(() => {
    if (transactions && transactions.groups && transactions.groups.length > 0) {
      setTimeout(() => {
        setIsLoaded(false);
      }, 1000);
      setHasRecord(true);
    } else {
      setTimeout(() => {
        setIsLoaded(false);
      }, 1000);
      setHasRecord(false);
    }
  }, [
    transactions,
  ])

  return (
    <>
      <IonLoading message="Fetching transactions..." duration={0} isOpen={isLoaded}></IonLoading>
      <IonContent>
        <IonFab vertical="bottom" horizontal="end" edge slot="fixed">
          <IonFabButton color={AppColor.TERTIARY} size="small">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        {transactions && transactions.groups && transactions.groups.length > 0 &&
          <LsGroupTransactions data={transactions} groupBy="transactionTypeDescription"></LsGroupTransactions>
        }
        {!hasRecord &&
          <LsMainCard color={StatusColor.WARNING} message="No records found!"></LsMainCard>
        }
      </IonContent>
      <IonFooter color={AppColor.TERTIARY}>
        <IonToolbar>
          {/* <LsMainChip color={AppColor.PRIMARY} text={`Total: $${expenses?.totalAmount.toFixed(2)}`} /> */}
        </IonToolbar>
      </IonFooter>
    </>
  );
};

export default connect<{}, StateProps, DispatchProps> ({
  mapStateToProps: (state) => ({
    transactions: selectorsTransactions.getTransactionsByGroup(state),
  }),
  mapDispatchToProps: ({}),
  component: React.memo(LsMainTransactions)
});