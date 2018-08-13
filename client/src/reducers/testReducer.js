import {
    SET_PASSAGE,
    SET_REPLAY,
    RESET_REPLAY_DATA
} from '../actions/types';

const initialState = {
    passage: null,
    passageId: null,
    raceId: null,
    replay: false,
    replayPassage: null,
    replayId: null
};

export default (state = initialState, action) => {
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
        case RESET_REPLAY_DATA:
            return initialState;
        default:
            return state;
    }
};