import DASHBOARD_ACTION from "../actions/actionTypes/dashboardActionTypes";
import { put } from 'redux-saga/effects';
import { getUserContests } from "../api/rest/userContoller";
import { getContestById } from "../api/rest/contestController";


export function* getUserContestsSaga() {
    try {
        const { data } = yield getUserContests();

        yield put({type: DASHBOARD_ACTION.USER_CONTESTS, myContests: data});
    } catch (e) {
        yield put({type: DASHBOARD_ACTION.DASHBOARD_ERROR, error: e})
    }
}

export function* getContestByIdSaga({id}) {
    try {

        const { data } = yield getContestById(id);
        yield put({type: DASHBOARD_ACTION.CONTEST_BY_ID, openContest: data});

    } catch (e) {
        yield put({type: DASHBOARD_ACTION.DASHBOARD_ERROR, error: e})
    }
}