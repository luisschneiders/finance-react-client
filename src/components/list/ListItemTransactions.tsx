import React from 'react';
import {
  IonLabel,
  IonItem,
} from '@ionic/react';
import LsMainChip from '../chip/MainChip';
import { AppColor } from '../../enum/AppColor';
import { dateFormatll } from '../../util/moment';
import { Transactions } from '../../models/Transactions';

interface ContainerProps {
  data: Transactions;
  index: number;
}

const LsListItemTransactions: React.FC<ContainerProps> = ({data, index}) => {
  let color: string = '';
  if (data && data.transactionLabel) {
    switch (data.transactionLabel) {
      case 'D':
        color = AppColor.TERTIARY;
        break;
      case 'C':
        color = AppColor.SUCCESS;
        break;
      default:
        color = AppColor.MEDIUM;
    }
  }
  return (
    <IonItem>
      <IonLabel>
        <h2>{dateFormatll(data.transactionDate)}</h2>
        <h4>{data.transactionBankDescription}</h4>
        <p>{data.transactionComments}</p>
      </IonLabel>
      <div slot="end">
        <LsMainChip color={color} text={`${data.transactionAmount.toFixed(2)}`}/>
      </div>
    </IonItem>
  );
};

export default React.memo(LsListItemTransactions);
