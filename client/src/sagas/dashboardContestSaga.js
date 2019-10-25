import DASHBOARD_ACTION from "../actions/actionTypes/dashboardActionTypes";
import { put, select } from 'redux-saga/effects';
import { getUserContests } from "../api/rest/userContoller";
import { getContestById, findContestsPyParams, newContestInformation } from "../api/rest/contestController";
import {TYPE_FIELD} from "../constants";

import { isEqual, isUndefined, cloneDeep } from "lodash"

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

        const filterDataToSend = cloneDeep(newInformation);
        const finalDataToSend = new FormData();

        let { dashboardContestsReducer: { openContest: oldOpenContest } } = yield select();

        for (const field in filterDataToSend) {
            const currentDataField = filterDataToSend[field];
            const oldDataField = oldOpenContest[field];


            if(isEqual(currentDataField, oldDataField)){

                delete filterDataToSend[field]

            }else if(isUndefined(currentDataField)){

                delete filterDataToSend[field]
            }

            if(field === TYPE_FIELD.INPUT_FILE && filterDataToSend[field]){

                const originalFileName = `${performance.now()}_${currentDataField.name}`;

                filterDataToSend[field] = originalFileName;

                finalDataToSend.append(field, currentDataField, originalFileName);
            }
        }

        finalDataToSend.append("updateFields", JSON.stringify(filterDataToSend));


        const { data } = yield newContestInformation(finalDataToSend, contestId);
        const newOpenContest = Object.assign({}, oldOpenContest, data);


        yield put({type: DASHBOARD_ACTION.CONTEST_BY_ID, openContest: newOpenContest});

    } catch (e) {
        yield put({type: DASHBOARD_ACTION.DASHBOARD_ERROR, error: e})
    }
}