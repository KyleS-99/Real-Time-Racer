import axios from 'axios';

import { SET_PASSAGE, GET_ERRORS } from './types';

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
    axios.post('/users/practice', data)
        .then((res) => {
            const { raceId } = res.data;

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