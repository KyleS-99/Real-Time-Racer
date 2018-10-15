import { 
    TOGGLE_MODAL, 
    CLOSE_MODAL 
} from '../actions/types';

const initialState = {
    displayModal: false,
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