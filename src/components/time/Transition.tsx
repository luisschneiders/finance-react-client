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
  dateFormatDDMMYYYY,
  decreasePeriod,
  increasePeriod,
} from '../../util/moment';

interface ContainerProps {
  dayOrMonthOrYear: 'day' | 'month' | 'year';
  period: Period;
  setPeriod: (period: Period) => void;
}

const LsTransition: React.FC<ContainerProps> = ({ dayOrMonthOrYear, period, setPeriod }) => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol className="ion-text-right ion-no-padding">
          <IonButton color={AppColor.LIGHT} size="small" onClick={() => setPeriod(decreasePeriod(period, dayOrMonthOrYear))}>
            <IonIcon icon={arrowBackOutline}/>
          </IonButton>
        </IonCol>
        <IonCol className="ion-text-center ion-no-padding">
          <IonButton color={AppColor.LIGHT} size="small" onClick={() => setPeriod(currentPeriod(dayOrMonthOrYear))}>
            {`${dateFormatDDMMYYYY(period.startDate)} - ${dateFormatDDMMYYYY(period.endDate)}`}
          </IonButton>
        </IonCol>
        <IonCol className="ion-text-left ion-no-padding">
          <IonButton color={AppColor.LIGHT} size="small" onClick={() => setPeriod(increasePeriod(period, dayOrMonthOrYear))}>
            <IonIcon icon={arrowForwardOutline}/>
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default LsTransition;
