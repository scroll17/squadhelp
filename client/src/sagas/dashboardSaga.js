import DASHBOARD_ACTION from "../actions/actionTypes/dashboardActionTypes";
import { put } from 'redux-saga/effects';
import { getUserContests } from "../api/rest/userContoller";


export function* getUserContestsSaga() {
    try {
        const { data } = yield getUserContests();

        console.log('data', data)

        yield put({type: DASHBOARD_ACTION.USER_CONTESTS, myContests: data});
    } catch (e) {
        yield put({type: DASHBOARD_ACTION.DASHBOARD_ERROR, error: e})
    }
}