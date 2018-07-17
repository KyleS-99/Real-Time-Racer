import isEmpty from '../validation/is-empty';
import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {},
    method: ''
};

export default (state = initialState, action) => {
    switch (action.payload) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload.user,
                method: action.payload.method
            }
        default:
            return state;
    }
};