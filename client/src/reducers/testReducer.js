import { SET_PASSAGE, SET_REPLAY } from '../actions/types';

const intialState = {
    passage: null,
    passageId: null,
    raceId: null,
    replay: null,
    replayPassage: null,
    replayId: null
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
        case SET_REPLAY:
            const { replayPassage, replayId } = action.payload;
            return {
                ...state,
                replayPassage,
                replayId,
                replay: true
            };
        default:
            return state;
    }
};