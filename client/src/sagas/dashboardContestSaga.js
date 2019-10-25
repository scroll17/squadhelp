import DASHBOARD_ACTION from "../actions/actionTypes/dashboardActionTypes";
import { put, select } from 'redux-saga/effects';
import { getUserContests } from "../api/rest/userContoller";
import { getContestById, findContestsPyParams, newContestInformation } from "../api/rest/contestController";


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

export function* findContestsByParamsSaga({queryParams}) {
    try {

        const { data } = yield findContestsPyParams(queryParams);

        yield put({type: DASHBOARD_ACTION.FOUND_CONTESTS, contests: data});

    } catch (e) {
        yield put({type: DASHBOARD_ACTION.DASHBOARD_ERROR, error: e})
    }
}


export function* updateContestSaga({newInformation, contestId}) {
    try {

        const finalDataToSend = new FormData();
        finalDataToSend.append("updateFields", JSON.stringify(newInformation));


        let {dashboardContestsReducer: { openContest: oldOpenContest } } = yield select();

        const { data } = yield newContestInformation(finalDataToSend, contestId);

        const newOpenContest = Object.assign({}, oldOpenContest, data);

        console.log("newOpenContest", newOpenContest)

        yield put({type: DASHBOARD_ACTION.CONTEST_BY_ID, openContest: newOpenContest});

    } catch (e) {
        yield put({type: DASHBOARD_ACTION.DASHBOARD_ERROR, error: e})
    }
}