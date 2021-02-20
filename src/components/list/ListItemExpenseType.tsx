import React, { useEffect, useState } from 'react';
import {
  IonLabel,
  IonItem,
  IonList,
} from '@ionic/react';
import { connect } from '../../data/connect';
import * as selectorsExpenseType from '../../data/expenseType/expenseType.selectors';
import { ExpenseType, ExpenseTypeList } from '../../models/ExpenseType';

interface StateProps {
  expenseTypeList: ExpenseTypeList;
}

interface DispatchProps {}

interface ListExpensesTypeProps extends StateProps, DispatchProps {}

const LsListItemExpenseType: React.FC<ListExpensesTypeProps> = ({expenseTypeList}) => {
  const [expenseType, setExpenseType] = useState<ExpenseType[]>([]);
  useEffect(() => {
    if (expenseTypeList) {
      setExpenseType(expenseTypeList.expensesType);
    }
  }, [expenseTypeList]);
  
  return (
    <>
      {(expenseType && expenseType.length) &&
        <IonList lines="full" >
          {expenseType.map((item: ExpenseType, index: number) => (
            <IonItem key={index}>
              <IonLabel>
                {item.expenseTypeDescription}
              </IonLabel>
              <div slot="end">
                {item.expenseTypeIsActive}
              </div>
            </IonItem>
          ))}
        </IonList>
      }
    </>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    expenseTypeList: selectorsExpenseType.getExpenseTypeList(state),
  }),
  mapDispatchToProps: ({}),
  component: React.memo(LsListItemExpenseType)
});
