import { IonChip, IonLabel } from '@ionic/react';
import React, { useEffect } from 'react';

interface ContainerProps {
  func: Function,
  data: any,
  id: string,
  color: string,
  label: string,
}

const LsMainCharts: React.FC<ContainerProps> = ({func, data, id, color, label}) => {
  useEffect(() => {
    if (data && data.length) {
      func(data);
    }
  });
  return (
    <>
      <IonChip color={color}>
        <IonLabel>{label}</IonLabel>
      </IonChip>
      <canvas id={id}></canvas>
    </>
  );
};

export default LsMainCharts;
