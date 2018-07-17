import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        // Add to Authorization header for every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        // Delete token from Authorization header
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;