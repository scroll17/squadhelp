import DASHBOARD_ACTION from '../../actions/actionTypes/dashboardActionTypes';
import { STAGE_OF_DASHBOARD } from "../../constants/dashboard";

const initialState = {
    stageNow: STAGE_OF_DASHBOARD.DASHBOARD,
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


