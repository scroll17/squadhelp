import ACTION from "../actions/actiontsTypes";
import { call, put } from 'redux-saga/effects';
import history from '../boot/browserHistory';

import { URL } from '../api/baseURL';
import { TOKEN } from '../constants'


export function saveTokenSaga({tokens}) {
    if(tokens.accessToken.length > 0){
        localStorage.setItem(TOKEN.ACCESS_TOKEN, tokens.accessToken);
        localStorage.setItem(TOKEN.REFRESH_TOKEN, tokens.refreshToken);
    }
}

export function* tokenErrorSaga() {
    yield put({type: ACTION.USER_LOGOUT});
    yield call(history.push, URL.LOGIN);
}
