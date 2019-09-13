import DASHBOARD_ACTION from "../actions/actionTypes/dashboardActionTypes";
import { put } from 'redux-saga/effects';
import { getUserEntries } from "../api/rest/userContoller";
import { createEntries } from "../api/rest/entriesController";


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
        if(formData.file){
            const originalFileName = `${performance.now()}_${formData.file.name}`;
            finalDataToSend.append("file", formData.file, originalFileName);
        }else{
            finalDataToSend.append("text", JSON.stringify(formData.text));
        }


        //yield createEntries(finalDataToSend);

    } catch (e) {
        yield put({type: DASHBOARD_ACTION.DASHBOARD_ERROR, error: e})
    }
}

