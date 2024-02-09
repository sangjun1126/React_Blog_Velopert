import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import { crateRequestActionTypes } from '../lib/createRequestSaga';

const CHANGE_FILED = 'auth/CHANGE_FILED';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = crateRequestActionTypes('auth/REGISTER');

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = crateRequestActionTypes('auth/LOGIN');