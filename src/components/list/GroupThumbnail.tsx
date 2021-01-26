import React from 'react';
import {
  IonLabel,
  IonList,
  IonItemGroup,
  IonItemDivider,
  IonText
} from '@ionic/react';
import LsListItemThumbnail from './ListItemThumbnail';
import { List } from '../../models/List';
import { AppColor } from '../../enum/AppColor';

interface ContainerProps {
  data: any;
  groupBy: string;
}

const LsGroupThumbnail: React.FC<ContainerProps> = ({data, groupBy}) => {
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
            </IonItemDivider>
            {group.map((listItem: List, listIndex: number) => (
              <LsListItemThumbnail
                index={index}
                list={listItem}
                key={`group-${index}-${listIndex}`} />
            ))}
          </IonItemGroup>
        ))}
      </IonList>
    </>
  );
};

export default LsGroupThumbnail;
