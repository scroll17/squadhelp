import DASHBOARD_ACTION from '../actionTypes/dashboardActionTypes';


export const getUserEntries = () => ({
    type: DASHBOARD_ACTION.GET_USER_ENTRIES
});

export const createEntry = formData => ({
    type: DASHBOARD_ACTION.CREATE_ENTRY,
    formData
});

export const updateEntryById = (id, status) => ({
    type: DASHBOARD_ACTION.UPDATE_ENTRY_BY_ID,
    id,
    status
});

export const likeEntryById = (id, liked) => ({
    type: DASHBOARD_ACTION.LIKE_ENTRY_BY_ID,
    id,
    liked
});