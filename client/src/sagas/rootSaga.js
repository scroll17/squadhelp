import { takeLatest } from 'redux-saga/effects';

import ACTION from '../actions/actionTypes/actionsTypes';
import CHAT_ACTION from '../actions/actionTypes/chatActionsTypes';

import {
    loginUserSaga,
    createUserSaga,
    userLogoutSaga,
    getUserSaga,
    getAllUserSaga,
    banUserByIdSaga,
} from './userSaga';

import { saveTokenSaga, tokenErrorSaga } from './tokenSaga'

import {
    createContestSaga,
    nextContestStageSaga,
    prevContestStageSaga,
    toContestQueueSaga,
    writeFormDataToStore,
    priceOfContestToStore
} from './contestSaga'

import {
    closeOrOpenConnectionSaga,
    closeStageFindUsersSaga,

    openConversationSaga,
    closeConversationSaga,

    addNewConversationSaga,

    newMessageSaga
} from './chatSaga'

function* rootSaga() {
    yield takeLatest(ACTION.LOGIN_USER, loginUserSaga);
    yield takeLatest(ACTION.CREATE_USER, createUserSaga);
    yield takeLatest(ACTION.USER_LOGOUT, userLogoutSaga);
    yield takeLatest(ACTION.GET_USER, getUserSaga);

    yield takeLatest(ACTION.GET_ALL_USER, getAllUserSaga);
    yield takeLatest(ACTION.BAN_USER_BY_ID, banUserByIdSaga);

    yield takeLatest(ACTION.SAVE_TOKENS_LOCALLY, saveTokenSaga);
    yield takeLatest(ACTION.TOKENS_ERROR, tokenErrorSaga);

    yield takeLatest(ACTION.CREATE_CONTEST, createContestSaga);
    yield takeLatest(ACTION.PREV_STAGE_CONTEST, prevContestStageSaga);
    yield takeLatest(ACTION.NEXT_STAGE_CONTEST, nextContestStageSaga);

    yield takeLatest(ACTION.ADD_TO_CONTEST_QUEUE, toContestQueueSaga);
    yield takeLatest(ACTION.WRITE_FORM_DATA_TO_STORE, writeFormDataToStore);

    yield takeLatest(ACTION.GET_PRICE_OF_CONTEST, priceOfContestToStore);


    yield takeLatest(CHAT_ACTION.CLOSE_OR_OPEN_CONNECTION, closeOrOpenConnectionSaga);
    yield takeLatest(CHAT_ACTION.TO_CLOSE_FIND_USERS_STAGE, closeStageFindUsersSaga);

    yield takeLatest(CHAT_ACTION.OPEN_CONVERSATION, openConversationSaga);
    yield takeLatest(CHAT_ACTION.CLOSE_CONVERSATION, closeConversationSaga);

    yield takeLatest(CHAT_ACTION.NEW_MESSAGE, newMessageSaga);
    yield takeLatest(CHAT_ACTION.ADD_NEW_CONVERSATION, addNewConversationSaga);
}

export default rootSaga;
