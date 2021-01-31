import React from 'react';
import {
  IonLabel,
  IonList,
  IonItemGroup,
  IonItemDivider,
  IonText,
} from '@ionic/react';
import LsListItemTransactions from './ListItemTransactions';
import { AppColor } from '../../enum/AppColor';
import LsMainChip from '../chip/MainChip';
import { amountByGroup } from '../../util/amountByGroup';
import { Transactions } from '../../models/Transactions';

interface ContainerProps {
  data: any;
  groupBy: string;
}

const LsGroupTransactions: React.FC<ContainerProps> = ({data, groupBy}) => {
  return (
    <>
      <IonList lines="full">
        {data.groups.map((group: any, index: number) => (
          <IonItemGroup key={`group-${index}`}>
            <IonItemDivider sticky>
              <IonLabel>
                <IonText color={AppColor.PRIMARY}>
                  <h3 className="ion-text-uppercase">{group[0][groupBy]}</h3>
                </IonText>
              </IonLabel>
              <div slot="end" className="ion-padding">
                <LsMainChip color={AppColor.PRIMARY} text={`$${amountByGroup(group, 'transactionAmount')}`}/>
              </div>
            </IonItemDivider>
            {group.map((data: Transactions, itemIndex: number) => (
              <LsListItemTransactions
                index={index}
                data={data}
                key={`group-${index}-${itemIndex}`} />
            ))}
          </IonItemGroup>
        ))}
      </IonList>
    </>
  );
};

export default LsGroupTransactions;
