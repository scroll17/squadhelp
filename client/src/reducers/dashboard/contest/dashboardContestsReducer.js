import DASHBOARD_ACTION from '../../../actions/actionTypes/dashboardActionTypes';

const initialState = {
    myContests: [],
    contests: [],
    openContest: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DASHBOARD_ACTION.USER_CONTESTS: {
            return {
                ...state,
                myContests: action.myContests,
                error: null
            }
        }
        case DASHBOARD_ACTION.CONTEST_BY_ID: {
            return {
                ...state,
                openContest: action.openContest,
                error: null
            }
        }
        default: {
            return state;
        }
    }
}


