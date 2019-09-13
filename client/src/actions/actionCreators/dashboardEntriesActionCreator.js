import DASHBOARD_ACTION from '../actionTypes/dashboardActionTypes';


export const getUserEntries = () => ({
    type: DASHBOARD_ACTION.GET_USER_ENTRIES
});

export const createEntry = formData => ({
    type: DASHBOARD_ACTION.CREATE_ENTRY,
    formData
});