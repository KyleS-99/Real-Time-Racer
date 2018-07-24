import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register a user
export const signupOrLogin = (userData, route, history) => dispatch => {
    axios.post(route, userData)
        .then((res) => {
            const { token } = res.data;

            // Save to localStorage
            localStorage.setItem('jwtToken', token);

            // Set Authorization header to the token
            setAuthToken(token);

            // Decode token
            const decodedToken = jwt_decode(token);

            const { user, method } = decodedToken;

            // Set id on user object
            user.id = decodedToken.id;

            // Set current user
            dispatch(setCurrentUser({ method, user }));

            // redirect to dashbaord
            history.push('/dashboard');
        })
        .catch((err) => 
            // Set errors
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in user
export const setCurrentUser = userData => ({
    type: SET_CURRENT_USER,
    payload: {
        method: userData.method || '',
        user: userData.user || {}
    }
});

// logout user
export const logoutUser = history => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');

    // Remove from Authorization header
    setAuthToken(false);

    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({ method: '', user: {}}));

    // If history object passed in, after logout is done redirect to homepage
    if (history) {
        history.push('/');
    }
};