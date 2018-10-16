import { CLOSE_MODAL, OPEN_MODAL } from './types';

export const closeModal = () => ({
    type: CLOSE_MODAL
});

export const openModal = () => ({
    type: OPEN_MODAL
});