import { TOGGLE_MODAL, CLOSE_MODAL, SET_CUSTOM_TEXT } from '../actions/types';

const initialState = {
    displayModal: false,
    text: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MODAL:
            return {
                ...state,
                displayModal: !state.displayModal
            };
        case CLOSE_MODAL:
            return {
                ...state,
                displayModal: false
            };
        default:
            return state;
    }
};