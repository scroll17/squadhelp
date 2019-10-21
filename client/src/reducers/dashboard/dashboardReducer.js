import DASHBOARD_ACTION from '../../actions/actionTypes/dashboardActionTypes';

const initialState = {
    sideMenuIsOpen: false,
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DASHBOARD_ACTION.CLOSE_OR_OPEN_SIDE_MENU: {
            return {
                ...state,
                sideMenuIsOpen: !action.isOpen,
                error: null
            }
        }
        case DASHBOARD_ACTION.DASHBOARD_ERROR: {
            return {
                ...state,
                error: action.error,
            }
        }
        default: {
            return state;
        }
    }
}


