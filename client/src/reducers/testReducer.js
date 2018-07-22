import { SET_PASSAGE } from '../actions/types';

const intialState = {
    wpm: null,
    acc: null,
    passage: null
};

export default (state = intialState, action) => {
    switch (action.type) {
        case SET_PASSAGE:
            return {
                ...state,
                passage: action.payload
            };
        default:
            return state;
    }
};