import React from 'react';
import { ModalContext } from '../../context/ModalContext';
import { useModal } from '../../hooks/useModal';

export interface ModalProvider {
  children?: React.ReactNode;
}

export function ModalProvider({children}: ModalProvider) {
  const { showModal, isSubmitting, handleShow, handleClose } = useModal();
  
  return (
    <ModalContext.Provider value={{showModal, isSubmitting, handleShow, handleClose}}>
      {children}
    </ModalContext.Provider>
  );
}
