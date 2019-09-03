import ACTION from './actiontsTypes';

//----- USER -----
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


// ----- ADMIN -----
export const getAllUser = () => ({
  type: ACTION.GET_ALL_USER,
});
export const banUserById = (userId, isBanned) => ({
  type: ACTION.BAN_USER_BY_ID,
  userId,
  isBanned,
});


// ----- CONTEST -----
export const nextContestStage = formData => ({
  type: ACTION.NEXT_STAGE_CONTEST,
  formData
});
export const prevContestStage = () => ({
  type: ACTION.PREV_STAGE_CONTEST,
});
export const addToContestQueue = stage => ({
  type: ACTION.ADD_TO_CONTEST_QUEUE,
  stage
});
export const createContest = formData => ({
  type: ACTION.CREATE_CONTEST,
  formData
});
export const getPriceOfContests = () => ({
  type: ACTION.GET_PRICE_OF_CONTEST,
});


// ----- CHAT -----
export const closeOrOpenChat = () => ({
  type: ACTION.CLOSE_OR_OPEN_CHAT,
});





