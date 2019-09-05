import ACTION from '../actionTypes/actionsTypes';

export const getAllUser = () => ({
    type: ACTION.GET_ALL_USER,
});
export const banUserById = (userId, isBanned) => ({
    type: ACTION.BAN_USER_BY_ID,
    userId,
    isBanned,
});