import { CLOSE_MODAL, TOGGLE_MODAL, SET_CUSTOM_TEXT } from './types';

export const closeModal = () => ({
    type: CLOSE_MODAL
});

export const toggleModal = () => ({
    type: TOGGLE_MODAL
});