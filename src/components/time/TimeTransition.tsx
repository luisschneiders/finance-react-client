import React, { useEffect } from 'react';
import {
  arrowBackOutline,
  arrowForwardOutline
} from 'ionicons/icons';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow
} from '@ionic/react';

interface ContainerProps {

}

const LsTimeTransition: React.FC<ContainerProps> = ({}) => {
  const changePeriod = (value: string) => {
    console.log('LFS - changePeriod value: ', value);
  }
  return (
    <>
    <IonGrid>
      <IonRow>
        <IonCol className="ion-text-right">
          <IonButton color="light" size="small" onClick={() => changePeriod('d')}>
            <IonIcon icon={arrowBackOutline}/>
          </IonButton>
        </IonCol>
        <IonCol className="ion-text-center" size="2">
          <IonButton color="light" size="small">2020</IonButton>
        </IonCol>
        <IonCol className="ion-text-left">
          <IonButton color="light" size="small" onClick={() => changePeriod('i')}>
            <IonIcon icon={arrowForwardOutline}/>
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
    </>
  )
};

export default LsTimeTransition;