import ACTION from "../actions/actionTypes/actionsTypes";
import { put, call } from 'redux-saga/effects';

import history from "../boot/browserHistory";


import {
    loginUser,
    createUser,
    userLogout,
    getUser
} from '../api/rest/userContoller';


import {TOKEN} from "../constants";
import {URL} from "../api/baseURL";

import historyPushOrBack from '../utils/history/historyPushOrBack';


export function* loginUserSaga({user}) {
    try {
        const { data } = yield loginUser(user);

        yield put({type: ACTION.USERS_RESPONSE, user: data.user});
        yield put({type: ACTION.SAVE_TOKENS_LOCALLY, tokens: data.tokenPair});


        //console.log(document.referrer);
        yield historyPushOrBack(history, call, URL.HOME);
    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e})
    }
}

export function* createUserSaga({user}) {
    try {
        const { data } = yield createUser(user);

        yield put({type: ACTION.USERS_RESPONSE, user: data.user});
        yield put({type: ACTION.SAVE_TOKENS_LOCALLY, tokens: data.tokenPair});

        yield historyPushOrBack(history, call, URL.HOME);

    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e})
    }
}

export function* userLogoutSaga() {
    try {
        const refreshToken = localStorage.getItem(TOKEN.REFRESH_TOKEN);
        yield call(userLogout, refreshToken);

        localStorage.clear();
        yield put({type: ACTION.USERS_RESPONSE, user: null});
    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e})
    }
}

export function* getUserSaga() {
    try {
        const { data } = yield getUser();
        yield put({type: ACTION.USERS_RESPONSE, user: data});
    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e})
    }
}
