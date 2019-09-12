import DASHBOARD_ACTION from "../actions/actionTypes/dashboardActionTypes";
import { put, select } from 'redux-saga/effects';
import { getUserContests } from "../api/rest/userContoller";
import { getContestById } from "../api/rest/dashboardController";

import { isEqual, isEmpty } from 'lodash'

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
        let {dashboardContestsReducer: { myContests, openContest }} = yield select();

        let contestInStore;
        if(openContest && isEqual(id, openContest.id)){
            contestInStore = openContest
        }else{
            myContests.forEach( contest => {
                if(isEqual(id, contest.id)){
                    contestInStore = contest
                }
            });
        }

        if(contestInStore){
            yield put({type: DASHBOARD_ACTION.CONTEST_BY_ID, openContest: contestInStore});
        }else{
            const { data } = yield getContestById(id);
            yield put({type: DASHBOARD_ACTION.CONTEST_BY_ID, openContest: data});
        }
    } catch (e) {
        yield put({type: DASHBOARD_ACTION.DASHBOARD_ERROR, error: e})
    }
}