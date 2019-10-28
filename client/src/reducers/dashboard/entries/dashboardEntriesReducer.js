import DASHBOARD_ACTION from '../../../actions/actionTypes/dashboardActionTypes';

const initialState = {
    myEntries: [],
    entries: [],
    openEntries: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DASHBOARD_ACTION.USER_ENTRIES: {
            return {
                ...state,
                myEntries: action.myEntries,
                error: null
            }
        }
        case DASHBOARD_ACTION.ENTRIES_BY_ID: {
            return {
                ...state,
                openEntries: action.openEntries,
                error: null
            }
        }
        default: {
            return state;
        }
    }
}

