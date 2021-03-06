import ACTION from '../actionTypes/actionsTypes';

export const createUser = user => ({
    type: ACTION.CREATE_USER,
    user
});
export const loginUser = user => ({
    type: ACTION.LOGIN_USER,
    user
});
export const userLogout = () => ({
    type: ACTION.USER_LOGOUT,
});
export const getUser = () => ({
    type: ACTION.GET_USER
});

export const getUserResponse = () => ({
    type: ACTION.USERS_RESPONSE
});
