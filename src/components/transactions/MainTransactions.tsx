import React, { useEffect, useState } from 'react';
import { connect } from '../../data/connect';
import { TransactionsGroup } from '../../models/Transactions';
import * as selectorsTransactions from '../../data/transactions/transactions.selectors';
import {
  IonContent,
  IonLoading,
} from '@ionic/react';
import { StatusColor } from '../../enum/StatusColor';
import LsMainCard from '../card/MainCard';
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
        {transactions && transactions.groups && transactions.groups.length > 0 &&
          <LsGroupTransactions data={transactions} groupBy="transactionTypeDescription"></LsGroupTransactions>
        }
        {!hasRecord &&
          <LsMainCard color={StatusColor.WARNING} message="No records found!"></LsMainCard>
        }
      </IonContent>
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