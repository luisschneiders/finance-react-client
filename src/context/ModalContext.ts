import { createContext } from 'react';

export interface ModalContext {
    showModal: boolean,
    isSubmitting: boolean,
    handleShow: () => void,
    handleClose: () => void,
}

export const ModalContext = createContext<ModalContext>({
    showModal: false,
    isSubmitting: false,
    handleShow: () => undefined,
    handleClose:() => undefined
});
