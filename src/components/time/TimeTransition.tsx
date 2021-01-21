import React from 'react';
import {
  arrowBackOutline,
  arrowForwardOutline
} from 'ionicons/icons';
import { AppColor } from '../../enum/AppColor';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow
} from '@ionic/react';

interface ContainerProps {
  formatPeriod: string;
  decreasePeriod: Function;
  currentPeriod: Function;
  increasePeriod: Function;
}

const LsTimeTransition: React.FC<ContainerProps> = ({formatPeriod, decreasePeriod, currentPeriod, increasePeriod}) => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol className="ion-text-right">
          <IonButton color={AppColor.LIGHT} size="small" onClick={() => decreasePeriod()}>
            <IonIcon icon={arrowBackOutline}/>
          </IonButton>
        </IonCol>
        <IonCol className="ion-text-center">
          <IonButton color={AppColor.LIGHT} size="small" onClick={() => currentPeriod()}>{formatPeriod}</IonButton>
        </IonCol>
        <IonCol className="ion-text-left">
          <IonButton color={AppColor.LIGHT} size="small" onClick={() => increasePeriod()}>
            <IonIcon icon={arrowForwardOutline}/>
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default LsTimeTransition;
