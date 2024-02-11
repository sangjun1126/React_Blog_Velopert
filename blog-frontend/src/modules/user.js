import {createAction, handleActions} from "redux-actions";
import {takeLatest} from "redux-saga/effects";
import * as authApI from '../lib/api/auth';
import createRequestSaga, {
    createRequestActionTypes,
} from "../lib/createRequestSaga"

const TEMP_SET_USER = 'user/TEMP_SET_USER'; // 새로고침 이후 임시 로그인 처리하기
// 회원 정보를 처리합니다.
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('user/CHECK');

export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const check = createAction(CHECK);

const checkSaga = createRequestSaga(CHECK, authApI.check);
export function* userSage() {
    yield takeLatest(CHECK, checkSaga);
}

const initialState = {
    user : null,
    checkError : null,
}

export default handleActions (
    {
        [TEMP_SET_USER] : (state, {payload : user}) => ({
            ...state,
            user,
        }),

        [CHECK_SUCCESS] : (state, {payload : user}) => ({
          ...state,
            user,
            checkError : null,
        }),

        [CHECK_FAILURE] : (state, {payload : error}) => ({
         ...state,
            user : null,
            checkError : error,
        }),
    },
    initialState,
);
