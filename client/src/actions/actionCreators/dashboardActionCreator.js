import DASHBOARD_ACTION from '../actionTypes/dashboardActionTypes';

export const closeOrOpenSideMenu = (isOpen) => ({
    type: DASHBOARD_ACTION.CLOSE_OR_OPEN_SIDE_MENU,
    isOpen
});



