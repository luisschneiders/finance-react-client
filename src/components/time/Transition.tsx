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
import * as MOMENT  from '../../util/moment';
import { Period } from '../../models/Period';
import {
  addEndPeriod,
  addStartPeriod,
  dateFormatll,
  endPeriod,
  startPeriod,
  subtractEndPeriod,
  subtractStartPeriod
} from '../../util/moment';

interface ContainerProps {
  period: Period;
  setPeriod: (period: Period) => void;
}

const LsTransition: React.FC<ContainerProps> = ({ period, setPeriod }) => {
  const decreasePeriod = (period: Period) => {
    setPeriod({
      startDate: subtractStartPeriod(period.startDate),
      endDate: subtractEndPeriod(period.endDate),
    })
  };

  const increasePeriod = (period: Period) => {
    setPeriod({
      startDate: addStartPeriod(period.startDate),
      endDate: addEndPeriod(period.endDate),
    });
  };

  const currentPeriod = () => {
    setPeriod({
      startDate: startPeriod(MOMENT.currentMonthYYYMMDD),
      endDate: endPeriod(MOMENT.currentMonthYYYMMDD),
    });
  };

  return (
    <IonGrid className="ion-no-padding">
      <IonRow>
        <IonCol className="ion-text-right ion-no-padding">
          <IonButton color={AppColor.LIGHT} size="small" onClick={() => decreasePeriod(period)}>
            <IonIcon icon={arrowBackOutline}/>
          </IonButton>
        </IonCol>
        <IonCol className="ion-text-center ion-no-padding">
          <IonButton color={AppColor.LIGHT} size="small" onClick={() => currentPeriod()}>
            {`${dateFormatll(period.startDate)} - ${dateFormatll(period.endDate)}`}
          </IonButton>
        </IonCol>
        <IonCol className="ion-text-left ion-no-padding">
          <IonButton color={AppColor.LIGHT} size="small" onClick={() => increasePeriod(period)}>
            <IonIcon icon={arrowForwardOutline}/>
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default LsTransition;
