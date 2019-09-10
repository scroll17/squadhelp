import DASHBOARD_ACTION from '../../actions/actionTypes/dashboardActionTypes';

const initialState = {
    myContests: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DASHBOARD_ACTION.USER_CONTESTS: {
            console.log('USER_CONTESTS', action.myContests);
            return {
                ...state,
                myContests: action.myContests,
                error: null
            }
        }
        default: {
            return state;
        }
    }
}


