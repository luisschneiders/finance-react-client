import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonListHeader,
  IonModal,
  IonTitle
} from '@ionic/react';
import React from 'react';
import './MainModal.scss'
import { closeSharp } from 'ionicons/icons';
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
      <IonModal
        isOpen={props.show}
        onDidDismiss={() => props.closeModal()}
        id={props.id}
        backdropDismiss={false}
        cssClass="main-modal"
      >
        <IonList lines="full">
          <IonListHeader>
            <IonTitle>{props.title}</IonTitle>
            <IonFab vertical="center" horizontal="end">
              <IonFabButton
                title="Close"
                size="small"
                color={AppColor.LIGHT}
                onClick={() => props.closeModal()}
              >
                <IonIcon
                  icon={closeSharp}
                  size="small"
                />
              </IonFabButton>
            </IonFab>
          </IonListHeader>
          {props.children}
        </IonList>
      </IonModal>
  );
}

export default LsMainModal;
