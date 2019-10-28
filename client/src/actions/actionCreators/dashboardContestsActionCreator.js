import DASHBOARD_ACTION from '../actionTypes/dashboardActionTypes';

export const closeOrOpenSideMenu = (isOpen) => ({
    type: DASHBOARD_ACTION.CLOSE_OR_OPEN_SIDE_MENU,
    isOpen
});

export const getUserContests = () => ({
    type: DASHBOARD_ACTION.GET_USER_CONTESTS
});

export const getContestById = (id) => ({
    type: DASHBOARD_ACTION.GET_CONTEST_BY_ID,
    id
});

export const findContestsPyParams = (queryParams = "?") => ({
    type: DASHBOARD_ACTION.FIND_CONTESTS_BY_PARAMS,
    queryParams
});

export const updateContest = (newInformation, contestId) => ({
    type: DASHBOARD_ACTION.UPDATE_CONTEST,
    newInformation,
    contestId
});