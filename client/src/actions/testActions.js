import axios from 'axios';

import {
    SET_PASSAGE,
    GET_ERRORS,
    SET_REPLAY,
    SET_CUSTOM_TEXT,
    SET_CUSTOM_RACE_DATA,
    SET_MULTIPLAYER_DATA
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
            history.push(`/race/result/${raceId}`);
        })
        .catch((err) => 
            dispatch({
                type: GET_ERRORS,
                payload: 'Unable to save race'
            })
        )
};

export const saveMultiplayerRace = (data, history) => dispatch => {
    axios.post('/tests/multiplayer', data)
        .then((res) => {
            const { raceId } = res.data;

            // Redirect user to after-race result
            history.push(`/race/result/${raceId}`);
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

export const setMultiplayerData = (data) => ({
    type: SET_MULTIPLAYER_DATA,
    payload: data
});

export const setCustomText = (text) => ({
    type: SET_CUSTOM_TEXT,
    payload: {
        text
    }
});

export const setCustomWPMAndAccuracy = (wpm, acc, history) => dispatch => {
    dispatch({
        type: SET_CUSTOM_RACE_DATA,
        payload: {
            wpm,
            acc
        }
    });

    // Redirect to /tests/result
    history.push('/race/result/');
};