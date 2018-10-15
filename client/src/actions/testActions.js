import axios from 'axios';

import {
    SET_PASSAGE,
    GET_ERRORS,
    SET_REPLAY,
    SET_CUSTOM_TEXT
} from './types';

export const setPassage = () => dispatch => {
    axios.get('/passages/random')
        .then(res => {
            const { passage, id } = res.data;
            dispatch(passageAction({ passage, id }));
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: 'Unable to fetch text'
            })
        );
};

export const savePracticeRace = (data, history) => dispatch => {
    axios.post('/tests/practice', data)
        .then((res) => {
            const { raceId } = res.data;

            // Redirect user to after-race result
            history.push(`/tests/practice/${raceId}`);
        })
        .catch((err) => 
            dispatch({
                type: GET_ERRORS,
                payload: 'Unable to save race'
            })
        )
};

export const passageAction = (passage) => ({
    type: SET_PASSAGE,
    payload: passage
});

export const replayAction = (replayId, replayPassage) => ({
    type: SET_REPLAY,
    payload: {
        replayId,
        replayPassage,
        replay: true
    }
});

export const setCustomText = (text) => ({
    type: SET_CUSTOM_TEXT,
    payload: {
        text
    }
});