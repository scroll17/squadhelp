import CHAT_ACTION from '../actionTypes/chatActionsTypes';

export const closeOrOpenConnection = (isOpen) => ({
    type: CHAT_ACTION.CLOSE_OR_OPEN_CONNECTION,
    isOpen
});
export const setSearchUsers = (toNextStage = null) => ({
    type: CHAT_ACTION.SEARCH_USERS,
    toNextStage
});
export const openConversation = (conversation) => ({
    type: CHAT_ACTION.OPEN_CONVERSATION,
    conversation
});
export const closeConversation = () => ({
    type: CHAT_ACTION.CLOSE_CONVERSATION,
});
export const addNewMessage = (message) => ({
    type: CHAT_ACTION.ADD_NEW_MESSAGE,
    message
});



