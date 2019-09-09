import CHAT_ACTION from '../../actions/actionTypes/chatActionsTypes';

const initialState = {
    conversations: [],
    openConversation: null,
    participantTyping: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHAT_ACTION.SHOW_CONVERSATIONS: {
            return {
                ...state,
                conversations: action.conversations,
            }
        }
        case CHAT_ACTION.PARTICIPANT_START_TYPING: {
            return {
                ...state,
                participantTyping: action.participantId,
            }
        }
        case CHAT_ACTION.PARTICIPANT_STOP_TYPING: {
            return {
                ...state,
                participantTyping: null,
            }
        }
        case CHAT_ACTION.OPEN_CONVERSATION: {
            return {
                ...state,
                openConversation: action.conversation,
            }
        }
        case CHAT_ACTION.ADD_CONVERSATION: {
            return {
                ...state,
                conversations: action.conservations,
            }
        }
        case CHAT_ACTION.CLOSE_CONVERSATION: {
            return {
                ...state,
                openConversation: null,
            }
        }
        default: {
            return state;
        }
    }
}


