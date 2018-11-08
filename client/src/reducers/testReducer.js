import {
    SET_PASSAGE,
    SET_REPLAY,
    RESET_DATA,
    SET_CUSTOM_TEXT,
    SET_CUSTOM_RACE_DATA,
    SET_MULTIPLAYER_DATA
} from '../actions/types';

const initialState = {
    passage: null,
    passageId: null,
    raceId: null,
    custom: false,
    customPassage: null,
    customWPM: null,
    customAccuracy: null,
    replay: false,
    replayPassage: null,
    replayId: null,
    multiplayer: false,
    multiplayerPassage: null,
    multiplayerPassageId: null,
    opponentName: null,
    opponentImg: null,
    uniqueKey: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PASSAGE:
            const { passage, id } = action.payload;
            
            return {
                ...state,
                passage,
                passageId: id,
                replay: false,
                replayPassage: null,
                custom: false,
                customPassage: null,
                multiplayer: false
            };
        case SET_REPLAY:
            const { replayPassage, replayId } = action.payload;

            return {
                ...state,
                replayPassage,
                replayId,
                replay: true,
                custom: false,
                customPassage: null,
                multiplayer: false
            };
        case RESET_DATA:
            return initialState;
        case SET_CUSTOM_TEXT:
            const { text } = action.payload;

            return {
                ...state,
                customPassage: text,
                custom: true,
                replay: false,
                replaypassage: null,
                passage: null,
                passageId: null,
                multiplayer: false
            };
        case SET_CUSTOM_RACE_DATA:
            const { acc, wpm } = action.payload;

            return {
                ...state,
                customWPM: wpm,
                customAccuracy: acc
            };
        case SET_MULTIPLAYER_DATA:
            const { name, img, passage: multiPassage, passageId, unique_key } = action.payload;

            return {
                ...state,
                custom: false,
                customPassage: null,
                replay: false,
                replayPassage: null,
                passage: null,
                passageId: null,
                multiplayer: true,
                multiplayerPassage: multiPassage,
                multiplayerPassageId: passageId,
                opponentName: name,
                opponentImg: img,
                uniqueKey: unique_key
            };
        default:
            return state;
    }
};