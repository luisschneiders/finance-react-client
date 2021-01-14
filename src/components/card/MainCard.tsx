import { IonCard, IonCardContent } from '@ionic/react';
import React from'react';

interface ContainerProps {
  color: string | undefined;
  message: string | undefined;
}

const LsMainCard: React.FC<ContainerProps> = ({color, message}) => {
  return (
    <IonCard color={color}>
    <IonCardContent className="ion-text-center">
      <span>{message}</span>
    </IonCardContent>
  </IonCard>
  );
}

export default LsMainCard;
