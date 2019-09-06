import CHAT_ACTION from '../actionTypes/chatActionsTypes';

export const closeOrOpenConnection = (isOpen) => ({
    type: CHAT_ACTION.CLOSE_OR_OPEN_CONNECTION,
    isOpen
});
export const startLookingUsers = () => ({
    type: CHAT_ACTION.TO_FIND_USERS_STAGE,
});
export const closeStageFindUsers = (nextStage) => ({
    type: CHAT_ACTION.TO_CLOSE_FIND_USERS_STAGE,
    nextStage
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



