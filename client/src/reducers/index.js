import { combineReducers } from 'redux';
import LoginReducer from './login';

const allReducers = combineReducers({ login: LoginReducer });

export default allReducers;
