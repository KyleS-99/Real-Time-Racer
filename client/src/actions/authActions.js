import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register a user
export const signupOrLogin = (userData, route, history) => dispatch => {
    axios.post(route, userData)
        .then((res) => {
            const { method, user, token } = res.data;

            // Save to localStorage
            localStorage.setItem('jwtToken', token);

            // Set Authorization header to the token
            setAuthToken(token);

            // Decode token
            const decodedToken = jwt_decode(token);

            // Set id on user object
            user.id = decodedToken.id;
            
            dispatch({
                type: SET_CURRENT_USER,
                payload: {
                    method,
                    user
                }
            });

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