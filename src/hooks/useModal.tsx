import { useState } from 'react';

export const useModal = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleSubmitting = () => setIsSubmitting(true);

    return {
        showModal,
        isSubmitting,
        handleShow,
        handleClose,
        handleSubmitting,
    };
}
