import axios from 'axios';

import { SET_PASSAGE, GET_ERRORS } from './types';

export const setPassage = () => dispatch => {
    axios.get('/passages/random')
        .then(res => 
            dispatch(passageAction(res.data.passage))
        )
        .catch(err => 
            console.log(err)
        );
};

export const passageAction = (passage) => ({
    type: SET_PASSAGE,
    payload: passage
});