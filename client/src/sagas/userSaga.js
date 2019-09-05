import ACTION from "../actions/actionTypes/actionsTypes";
import {put, call, select} from 'redux-saga/effects';

import history from "../boot/browserHistory";

import * as _ from 'lodash';

import {
    loginUser,
    createUser,
    userLogout,
    getUser,
    getAllUser,
    banUserById,
} from '../api/rest/restContoller';
import {TOKEN} from "../constants";
import {URL} from "../api/baseURL";

import historyPushOrBack from '../utils/historyPushOrBack';


//----- USER -----
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



// ----- ADMIN -----
export function* getAllUserSaga() {
    try {
        const { data } = yield call(getAllUser);
        yield put({type: ACTION.USERS_RESPONSE, users: data});
    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e})
    }
}

export function* banUserByIdSaga({userId, isBanned}) {
    try {

        const {data} = yield banUserById(userId, !isBanned);

        let {userReducers: {users: prevUsers}} = yield select();               // connect to store
        const newUsers = _.concat([...prevUsers]);

        const userIndex = _.findIndex(newUsers, user => data.id === user.id);
        if (userIndex >= 0) {
            newUsers[userIndex] = data;
        }


        yield put({type: ACTION.USERS_RESPONSE, users: newUsers});
    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e});
    }
}

