import ACTION from '../actionTypes/actionsTypes';

export const createUser = user => ({
    type: ACTION.CREATE_USER,
    user
});

export const updateUserAvatar = (avatar) => ({
    type: ACTION.UPDATE_USER_AVATAR,
    avatar
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

export const cashOutUserBalance = formData => ({
    type: ACTION.CASH_OUT_USER_BALANCE,
    formData
});