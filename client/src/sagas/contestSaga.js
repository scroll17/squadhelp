import ACTION from "../actions/actiontsTypes";
import {createContest, getPriceOfContests} from "../api/rest/restContoller";

import { put, call, select } from 'redux-saga/effects';
import history from "../boot/browserHistory";

import { reset } from 'redux-form';

import { CONTEST } from "../constants";

import * as _ from 'lodash';
import {URL} from "../api/baseURL";

export function* createContestSaga({formData}) {
    try {
        const { contestReducers: { contestNow, contestFormData, priceOfContest } } = yield select();

        const contestFormDataToSend = _.cloneDeep(contestFormData);
        const finalDataToSend = new FormData();


        const dataToSend = [];
        const forms = Object.keys(contestFormDataToSend);

        forms.forEach( form => {
            const currentFormData = contestFormData[form];

            const convertedFormData = {
                price: priceOfContest[form],
                contestType: form
            };

            for (const field in currentFormData) {

                if(currentFormData.hasOwnProperty(field)){
                    const currentDataField = currentFormData[field];

                    if(field === 'files'){
                        const originalFileName = `${performance.now()}_${currentDataField.name}`;

                        convertedFormData[field] = originalFileName;
                        finalDataToSend.append(field, currentDataField, originalFileName);

                    }else if(Array.isArray(currentDataField)){

                        convertedFormData[field] = currentDataField.map( data => data.value)

                    }else if(_.isObject(currentDataField)){

                        convertedFormData[field] = currentDataField.value
                    }else{

                        convertedFormData[field] = currentDataField
                    }
                }
            }

            dataToSend.push(convertedFormData);
        });
        finalDataToSend.append("formFields", JSON.stringify(dataToSend));

        const { data } = yield createContest(finalDataToSend);
        console.log(data);
        yield put({type: ACTION.USERS_RESPONSE});

        for (let formIndex = 1; formIndex <= _.size(contestNow); formIndex++) {
            yield put(reset(contestNow[formIndex]))
        }
        sessionStorage.clear();

        yield put({type: ACTION.STAGE_CONTEST, contestNow: [CONTEST.SELECT], contestQueue:[]});
        yield put({type: ACTION.WRITE_CONTEST_FORM_DATA, contestFormData: {}});

        yield call(history.push, URL.HOME);
    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e})
    }
}

export function* nextContestStageSaga({formData}) {


    try {
        let {contestReducers: {contestNow, contestQueue }} = yield select();

        yield put({type: ACTION.WRITE_FORM_DATA_TO_STORE, formData});

        const contest = _.clone(contestNow);
        const queue = _.clone(contestQueue);
        contest.push(queue.shift());

        yield put({type: ACTION.STAGE_CONTEST, contestNow: [...contest], contestQueue:[...queue] } );
    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e})
    }
}

export function* prevContestStageSaga() {
    try {
        let {contestReducers: {contestNow: prevContest, contestQueue}} = yield select();
        const contest = _.clone(prevContest);
        const queue = _.clone(contestQueue);

        const newContest = [..._.initial(contest)];
        const newQueue = [..._.takeRight(contest, 1), ...queue];

        yield put({type: ACTION.STAGE_CONTEST, contestNow: [...newContest], contestQueue:[...newQueue]  } );
    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e})
    }
}


export function* toContestQueueSaga({stage}) {
    try {
        let {contestReducers: {contestNow: prevContest}} = yield select();

        let contest = [..._.clone(prevContest), _.first(stage)];

        let newQueue;
        if(_.size(stage) > 1){
            newQueue = [..._.tail(stage), CONTEST.BANKS]
        }else{
            newQueue = [CONTEST.BANKS];
        }

        yield put({type: ACTION.STAGE_CONTEST, contestNow: [...contest] ,contestQueue: [...newQueue] } );

    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e})
    }
}

export function* writeFormDataToStore({formData}) {
    try {
        let {contestReducers: {contestNow, contestFormData}} = yield select();

        console.log('formData', formData);

        if(formData){
            const newContestFormData = _.cloneDeep(contestFormData);
            newContestFormData[_.last(contestNow)] = _.clone(formData);
            yield put({type: ACTION.WRITE_CONTEST_FORM_DATA, contestFormData: newContestFormData } );
        }
    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e})
    }
}


export function* priceOfContestToStore() {
    try {
        const { data } = yield call(getPriceOfContests);

        yield put({type: ACTION.WRITE_PRICE_OF_CONTEST, priceOfContest: data});
    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e})
    }
}