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
import { Period } from '../../models/Period';
import {
  currentPeriod,
  dateFormatll,
  decreasePeriod,
  increasePeriod,
} from '../../util/moment';

interface ContainerProps {
  period: Period;
  setPeriod: (period: Period) => void;
}

const LsTransition: React.FC<ContainerProps> = ({ period, setPeriod }) => {
  return (
    <IonGrid className="ion-no-padding">
      <IonRow>
        <IonCol className="ion-text-right ion-no-padding">
          <IonButton color={AppColor.LIGHT} size="small" onClick={() => setPeriod(decreasePeriod(period))}>
            <IonIcon icon={arrowBackOutline}/>
          </IonButton>
        </IonCol>
        <IonCol className="ion-text-center ion-no-padding">
          <IonButton color={AppColor.LIGHT} size="small" onClick={() => setPeriod(currentPeriod())}>
            {`${dateFormatll(period.startDate)} - ${dateFormatll(period.endDate)}`}
          </IonButton>
        </IonCol>
        <IonCol className="ion-text-left ion-no-padding">
          <IonButton color={AppColor.LIGHT} size="small" onClick={() => setPeriod(increasePeriod(period))}>
            <IonIcon icon={arrowForwardOutline}/>
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default LsTransition;