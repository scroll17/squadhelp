import DASHBOARD_ACTION from "../actions/actionTypes/dashboardActionTypes";
import { put } from 'redux-saga/effects';
import { getUserEntries } from "../api/rest/userContoller";
import { createEntries } from "../api/rest/entriesController";

import history from "../boot/browserHistory";
import { URL } from "../api/baseURL";

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

