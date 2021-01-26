import React from 'react';
import {
  IonLabel,
  IonItem,
} from '@ionic/react';
import { Expenses } from '../../models/Expenses';
import LsMainChip from '../chip/MainChip';
import { AppColor } from '../../enum/AppColor';
import { dateFormatll } from '../../util/moment';

interface ContainerProps {
  data: Expenses;
  index: number;
}

const LsListItemExpenses: React.FC<ContainerProps> = ({data, index}) => {

  return (
    <IonItem>
      <IonLabel>
        <h2>{dateFormatll(data.expenseDate)}</h2>
        <h4>{data.expenseBankDescription}</h4>
        <p>{data.expenseComments}</p>
        <h6>{data.expenseAddress}</h6>
      </IonLabel>
      <div slot="end">
        <LsMainChip color={AppColor.TERTIARY} text={`${data.expenseAmount.toFixed(2)}`}/>
      </div>
    </IonItem>
  );
};

export default React.memo(LsListItemExpenses);
