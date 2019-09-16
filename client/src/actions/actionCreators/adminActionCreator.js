import ADMIN_ACTION from '../actionTypes/adminActionTypes';

export const getAllUser = () => ({
    type: ADMIN_ACTION.GET_ALL_USER,
});
export const banUserById = (userId, isBanned) => ({
    type: ADMIN_ACTION.BAN_USER_BY_ID,
    userId,
    isBanned,
});

export const getAllEntries = () => ({
    type: ADMIN_ACTION.GET_ALL_ENTRIES,
});
export const updateValidityEntry = () => ({
    type: ADMIN_ACTION.UPDATE_VALIDITY_OF_ENTRY,
});