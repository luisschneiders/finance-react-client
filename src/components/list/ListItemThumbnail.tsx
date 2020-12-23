import React, { useRef, useState } from 'react';
import {
  IonLabel,
  IonItem,
  IonThumbnail,
  IonImg,
  IonItemSliding
} from '@ionic/react';
import * as ROUTES from '../../constants/Routes';
import { List } from './List';
import LsImgPlaceholder from '../img/ImgPlaceholder';
import { SIZE_56 } from '../../constants/Images';

interface ContainerProps {
  list: List;
  index: number;
}

const LsListItemThumbnail: React.FC<ContainerProps> = ({list, index}) => {
  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null);
  const [isImageLoaded, setImageLoaded] = useState(false);

  const onImgLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <IonItemSliding ref={ionItemSlidingRef}>
      {/* <IonItem key={`group-item-${index}`} routerLink={`${ROUTES.TABS_TRANSACTIONS}/${list.id}`}>
      <IonThumbnail slot="start">
        {!isImageLoaded && <LsImgPlaceholder size={SIZE_56} radius={null}></LsImgPlaceholder>}
        <IonImg src={list.image} alt={list.alt} onIonImgDidLoad={onImgLoaded}/>
      </IonThumbnail>
      <IonLabel>
        <h2>{list.headline}</h2>
        <p>{list.summary}</p>
      </IonLabel>
    </IonItem> */}
  </IonItemSliding>
  );
};

export default React.memo(LsListItemThumbnail);
