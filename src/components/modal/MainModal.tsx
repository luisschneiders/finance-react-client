import {
  IonButton,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal
} from '@ionic/react';
import React from 'react';
import { close } from 'ionicons/icons';
import { AppColor } from '../../enum/AppColor';

interface ModalProps {
  id: string;
  show: boolean;
  title?: string;
  isSubmitting: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
}
const LsMainModal: React.FC<ModalProps> = (props: ModalProps) => {

  return (
    <IonModal isOpen={props.show} onDidDismiss={() => props.closeModal()} id={props.id}>
      <IonList lines="full">
        <IonListHeader>
          <IonLabel>{props.title}</IonLabel>
          <IonButton onClick={() => props.closeModal()}>
            <IonIcon icon={close} color={AppColor.TERTIARY}>Close</IonIcon>
          </IonButton>
        </IonListHeader>
        {props.children}
      </IonList>
    </IonModal>
  );
}

export default LsMainModal;
