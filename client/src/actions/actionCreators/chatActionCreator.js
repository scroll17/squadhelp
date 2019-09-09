import CHAT_ACTION from '../actionTypes/chatActionsTypes';

export const closeOrOpenConnection = (isOpen) => ({
    type: CHAT_ACTION.CLOSE_OR_OPEN_CONNECTION,
    isOpen
});
export const startFindUsers = () => ({
    type: CHAT_ACTION.TO_FIND_USERS_STAGE,
});
export const closeStageFindUsers = (nextStage) => ({
    type: CHAT_ACTION.TO_CLOSE_FIND_USERS_STAGE,
    nextStage
});

export const addNewMessage = (message) => ({
    type: CHAT_ACTION.NEW_MESSAGE,
    message
});


export const openConversation = (conversation) => ({
    type: CHAT_ACTION.OPEN_CONVERSATION,
    conversation
});
export const closeConversation = (openConversation) => ({
    type: CHAT_ACTION.CLOSE_CONVERSATION,
    openConversation
});



