import ADMIN_ACTION from "../actions/actionTypes/adminActionTypes";
import {put, call, select} from 'redux-saga/effects';

import * as _ from 'lodash';

import { getAllUser, banUserById, getAllEntries, updateValidityStatusEntry } from '../api/rest/adminController';


export function* getAllUserSaga() {
    try {
        const { data } = yield call(getAllUser);
        yield put({type: ADMIN_ACTION.ALL_USERS, users: data});
    } catch (e) {
        yield put({type: ADMIN_ACTION.ADMIN_ERROR, error: e})
    }
}
export function* banUserByIdSaga({userId, isBanned}) {
    try {

        const {data} = yield banUserById(userId, !isBanned);

        let {adminReducer: {users: prevUsers}} = yield select();
        const newUsers = _.concat([...prevUsers]);

        const userIndex = _.findIndex(newUsers, user => data.id === user.id);
        if (userIndex >= 0) {
            newUsers[userIndex] = data;
        }

        yield put({type: ADMIN_ACTION.ALL_USERS, users: newUsers});
    } catch (e) {
        yield put({type: ADMIN_ACTION.ADMIN_ERROR, error: e});
    }
}

export function* getAllEntriesSaga() {
    try {
        const { data } = yield call(getAllEntries);

        yield put({type: ADMIN_ACTION.ALL_ENTRIES, entries: data});
    } catch (e) {
        yield put({type: ADMIN_ACTION.ADMIN_ERROR, error: e})
    }
}

export function* updateValidityEntrySaga({id, status}) {

    try {

        const { data: updatedEntry } = yield updateValidityStatusEntry(id, status);

        const {adminReducer: {entries: prevEntries}} = yield select();
        const newEntries = _.cloneDeep(prevEntries);

        const entryIndex = _.findIndex(newEntries, entry => _.isEqual(updatedEntry.id, entry.id));
        if (entryIndex >= 0) {
            const oldEntry = newEntries[entryIndex];

            for( let field in updatedEntry ){
                const oldFieldData = oldEntry[field];
                const newFieldData = updatedEntry[field];

                if(!_.isEqual(oldFieldData, newFieldData)){
                    oldEntry[field] = newFieldData
                }
            }
        }

        yield put({type: ADMIN_ACTION.ALL_ENTRIES, entries: newEntries});
    } catch (e) {
        yield put({type: ADMIN_ACTION.ADMIN_ERROR, error: e});
    }
}