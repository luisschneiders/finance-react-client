import React, { useEffect, useState } from 'react';
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
import { connect } from '../../data/connect';
import { setHomeTimeTransition } from '../../data/user/user.actions';
import * as MOMENT  from '../../util/moment';
import { AppColor } from '../../enum/AppColor';

interface StateProps {
}
interface DispatchProps {
  setHomeTimeTransition: typeof setHomeTimeTransition;
}
interface TimeTransitionProps extends StateProps, DispatchProps {}

const LsTimeTransition: React.FC<TimeTransitionProps> = ({ setHomeTimeTransition }) => {
  const [year, setYear] = useState<number>(MOMENT.currentYearYYYY);

  useEffect(() => {
    setHomeTimeTransition(year);
  });

  const decreasePeriod = (period: number = year) => setYear(--period);
  const increasePeriod = (period: number = year) => setYear(++period);

  const currentTime = () => {
    setHomeTimeTransition(MOMENT.currentYearYYYY);
    setYear(MOMENT.currentYearYYYY);
  };

  return (
    <>
    <IonGrid>
      <IonRow>
        <IonCol className="ion-text-right">
          <IonButton color={AppColor.LIGHT} size="small" onClick={() => decreasePeriod()}>
            <IonIcon icon={arrowBackOutline}/>
          </IonButton>
        </IonCol>
        <IonCol className="ion-text-center" size="3">
          <IonButton color={AppColor.LIGHT} size="small" onClick={() => currentTime()}>{year}</IonButton>
        </IonCol>
        <IonCol className="ion-text-left">
          <IonButton color={AppColor.LIGHT} size="small" onClick={() => increasePeriod()}>
            <IonIcon icon={arrowForwardOutline}/>
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
    </>
  )
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
  }),
  mapDispatchToProps: ({
    setHomeTimeTransition
  }),
  component: React.memo(LsTimeTransition)
});
