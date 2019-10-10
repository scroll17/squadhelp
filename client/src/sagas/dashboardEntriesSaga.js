import DASHBOARD_ACTION from "../actions/actionTypes/dashboardActionTypes";
import { put, select } from 'redux-saga/effects';

import { getUserEntries } from "../api/rest/userContoller";
import { createEntries, updateEntryById } from "../api/rest/entriesController";

import history from "../boot/browserHistory";
import { URL } from "../api/baseURL";
import {STATUS_OF_CONTEST_AND_ENTRY} from "../constants";
import ACTION from "../actions/actionTypes/actionsTypes";

import { isEqual, cloneDeep, findIndex } from 'lodash'

import { TYPE_UPDATE_ENTRY } from "../constants";

export function* updateEntryByIdSaga({id, status}) {
    try {
        const updateType = TYPE_UPDATE_ENTRY.STATUS;
        let {dashboardContestsReducer: { openContest: oldOpenContest }} = yield select();

        const newOpenContest = cloneDeep(oldOpenContest);
        const entryIndex = findIndex(newOpenContest.Entries, entry => entry.id === id);

        if(isEqual(status, STATUS_OF_CONTEST_AND_ENTRY.REJECT)){

            yield updateEntryById(id, { status }, updateType);

            newOpenContest.Entries.splice(entryIndex, 1);

            yield put({type: DASHBOARD_ACTION.CONTEST_BY_ID, openContest: newOpenContest});
        }else{

            yield updateEntryById(id, {
                status,
                contestUuid: oldOpenContest.contestId,
                contestId: oldOpenContest.id
            }, updateType);

            const newEntry = newOpenContest.Entries[entryIndex];
            newEntry.status = STATUS_OF_CONTEST_AND_ENTRY.RESOLVE;
            newOpenContest.Entries = [newEntry];

            yield put({type: DASHBOARD_ACTION.CONTEST_BY_ID, openContest: newOpenContest});
        }
    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e})
    }
}


export function* likeEntryByIdSaga({id, liked}) {
    try {

        const updateType = TYPE_UPDATE_ENTRY.LIKED;

        let {dashboardContestsReducer: { openContest: oldOpenContest }} = yield select();

        const newOpenContest = cloneDeep(oldOpenContest);
        const entryIndex = findIndex(newOpenContest.Entries, entry => entry.id === id);

        yield updateEntryById(id, {
            liked: !liked
        }, updateType);

        newOpenContest.Entries[entryIndex].liked = !liked;

        yield put({type: DASHBOARD_ACTION.CONTEST_BY_ID, openContest: newOpenContest});
    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e})
    }
}



export function* getUserEntriesSaga() {
    try {
        const { data } = yield getUserEntries();

        yield put({type: DASHBOARD_ACTION.USER_ENTRIES, myEntries: data});
    } catch (e) {
        yield put({type: DASHBOARD_ACTION.DASHBOARD_ERROR, error: e})
    }
}

export function* createEntrySaga({formData}) {

    try {
        const finalDataToSend = new FormData();
        const dataToSend = {
            contestId: formData.contestId,
            userId: formData.userId,
        };

        if(formData['file']){
            const originalFileName = `${performance.now()}_${formData.file.name}`;
            dataToSend['file'] = originalFileName;

            finalDataToSend.append("file", formData.file, originalFileName);
        }else{
            dataToSend['text'] = formData.text;
        }
        finalDataToSend.append("contentOfEntry", JSON.stringify(dataToSend));


        yield createEntries(finalDataToSend);

        history.push(`${URL.DASHBOARD}${URL.MY_ACCOUNT}`)
    } catch (e) {
        yield put({type: DASHBOARD_ACTION.DASHBOARD_ERROR, error: e})
    }
}

