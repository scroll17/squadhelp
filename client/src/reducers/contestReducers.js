import ACTION from '../actions/actionTypes/actionsTypes';

const restoreValues = (item) => {
    return JSON.parse(sessionStorage.getItem(item))
};

const initialState = {
    contestNow: restoreValues('contestNow') || ['select'],
    contestQueue: restoreValues('contestQueue') || [],
    contestFormData: restoreValues('contestFormData') || {},
    priceOfContest: {},
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.STAGE_CONTEST: {
            return {
                ...state,
                contestNow: action.contestNow,
                contestQueue: action.contestQueue,
                error: null
            }
        }
        case ACTION.WRITE_CONTEST_FORM_DATA: {
            return {
                ...state,
                contestFormData: action.contestFormData,
                error: null
            }
        }
        case ACTION.WRITE_PRICE_OF_CONTEST: {
            return {
                ...state,
                priceOfContest: action.priceOfContest,
                error: null
            }
        }
        default: {
            return state;
        }
    }
}


