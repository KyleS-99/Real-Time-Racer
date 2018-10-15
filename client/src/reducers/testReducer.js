import {
    SET_PASSAGE,
    SET_REPLAY,
    RESET_REPLAY_DATA,
    SET_CUSTOM_TEXT
} from '../actions/types';

const initialState = {
    passage: null,
    passageId: null,
    raceId: null,
    custom: false,
    customPassage: null,
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
                replay: true,
                custom: false,
                customPassage: null
            };
        case RESET_REPLAY_DATA:
            return initialState;
        case SET_CUSTOM_TEXT:
            const { text } = action.payload;

            return {
                ...state,
                customPassage: text,
                custom: true,
                replay: false,
                replaypassage: null
            };
        default:
            return state;
    }
};