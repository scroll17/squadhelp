import CHAT_ACTION from '../../actions/actionTypes/chatActionsTypes';

const initialState = {
    conversations: [],
    openConversation: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHAT_ACTION.SHOW_CONVERSATIONS: {
            return {
                ...state,
                conversations: action.conservations,
            }
        }

        case CHAT_ACTION.OPEN_CONVERSATION: {
            return {
                ...state,
                //stageNow: STAGE_OF_CHAT.CONVERSATION,
                openConversation: action.conversation,
                //foundUsers: [],
            }
        }
        case CHAT_ACTION.CLOSE_CONVERSATION: {
            return {
                ...state,
                //stageNow: STAGE_OF_CHAT.BEGIN,
                openConversation: null,
                //messages: [],
            }
        }
        default: {
            return state;
        }
    }
}


