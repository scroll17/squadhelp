import ACTION from "../actions/actionTypes/actionsTypes";
import { put, call, select } from 'redux-saga/effects';

import history from "../boot/browserHistory";


import {
    loginUser,
    createUser,
    userLogout,
    getUser,
    cashOutUserBalance,
    newUserAvatar,
    newUserInformation
} from '../api/rest/userContoller';


import {TOKEN, TYPE_FIELD, USER_FIELDS} from "../constants";
import {URL} from "../api/baseURL";

import historyPushOrBack from '../utils/history/historyPushOrBack';

import { cloneDeep } from "lodash"

export function* loginUserSaga({user}) {
    try {
        const { data } = yield loginUser(user);

        yield put({type: ACTION.USERS_RESPONSE, user: data.user});
        yield put({type: ACTION.SAVE_TOKENS_LOCALLY, tokens: data.tokenPair});


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


export function* cashOutUserBalanceSaga({formData}) {
    try {

        const formDataToSend = {
            ...formData,
            number: formData.number.replace(/\s+/g, ''),
        };

        yield cashOutUserBalance(formDataToSend);

        const { userReducer: { user } } = yield select();

        const newUser = cloneDeep(user);
        newUser.balance -= formData.sum;

       yield put({type: ACTION.USERS_RESPONSE, user: newUser});

    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e})
    }
}

export function* updateUserAvatarSaga({avatar}) {
    try {

        const finalDataToSend = new FormData();
        const originalFileName = `${performance.now()}_${avatar.name}`;

        finalDataToSend.append(TYPE_FIELD.INPUT_FILE, avatar, originalFileName);
        finalDataToSend.append(USER_FIELDS.AVATAR, originalFileName);

        const { data } = yield newUserAvatar(finalDataToSend);

        yield put({type: ACTION.USERS_RESPONSE, user: data});

    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e})
    }
}

export function* updateUserInformationSaga({information}) {
    try {

        const { data } = yield newUserInformation(information);

        yield put({type: ACTION.USERS_RESPONSE, user: data});

    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e})
    }
}