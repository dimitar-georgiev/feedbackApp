/**
 * Created by Mitaka on 21-Oct-17.
 */
import {combineReducers} from 'redux';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer
});