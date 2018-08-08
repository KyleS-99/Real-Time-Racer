import { SET_PASSAGE } from '../actions/types';

const intialState = {
    passage: null,
    passageId: null,
    raceId: null
};

export default (state = intialState, action) => {
    switch (action.type) {
        case SET_PASSAGE:
            const { passage, id } = action.payload;
            return {
                ...state,
                passage,
                passageId: id
            };
        default:
            return state;
    }
};