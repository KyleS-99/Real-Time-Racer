import { 
    OPEN_MODAL, 
    CLOSE_MODAL 
} from '../actions/types';

const initialState = {
    displayModal: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                displayModal: true
            };
        case CLOSE_MODAL:
            return {
                displayModal: false
            };
        default:
            return state;
    }
};