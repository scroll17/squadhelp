import ACTION from '../actionTypes/actionsTypes';

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