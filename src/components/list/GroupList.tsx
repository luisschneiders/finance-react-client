import React from 'react';
import {
  IonLabel,
  IonList,
  IonItemGroup,
  IonItemDivider,
  IonText
} from '@ionic/react';
import LsListItemThumbnail from './ListItemThumbnail';
import { List } from './List';

interface ContainerProps {
  data: any;
}

const LsGroupList: React.FC<ContainerProps> = ({data}) => {
  return (
    <>
      <IonList lines="full">
        {data.groups.map((group: any, index: number) => (
          <IonItemGroup key={`group-${index}`}>
            <IonItemDivider sticky>
              <IonLabel>
                <IonText color="primary">
                  <h3 className="ion-text-uppercase">{group[0].category}</h3>
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

export default LsGroupList;
