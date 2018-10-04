import { combineReducers } from 'redux';

// Reducers
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import testReducer from './testReducer';
import modalReducer from './modalReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    test: testReducer,
    modal: modalReducer
});