import CHAT_ACTION from '../actions/actionTypes/chatActionsTypes';
import { STAGE_OF_CHAT } from "../constants/chatConst";

const initialState = {
    conversations: [],
    messages: [],
    openConversation: null,
    foundUsers: null,
    stageNow: STAGE_OF_CHAT.BEGIN,
    isOpen: false,
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHAT_ACTION.CLOSE_OR_OPEN_CHAT: {
            return {
                ...state,
                isOpen: action.isOpen,
                error: null
            }
        }
        case CHAT_ACTION.SHOW_CONVERSATIONS: {
            return {
                ...state,
                conversations: action.conservations,
                error: null
            }
        }
        case CHAT_ACTION.OPEN_CONVERSATION: {
            return {
                ...state,
                stageNow: STAGE_OF_CHAT.CONVERSATION,
                openConversation: action.conversation,
                foundUsers: null,
                error: null
            }
        }
        case CHAT_ACTION.CLOSE_CONVERSATION: {
            return {
                ...state,
                stageNow: STAGE_OF_CHAT.BEGIN,
                openConversation: null,
                messages: [],
                error: null
            }
        }
        case CHAT_ACTION.NEW_MESSAGE: {
            return {
                ...state,
                messages: action.messages,
                error: null
            }
        }
        case CHAT_ACTION.SEARCH_USERS: {
            return {
                ...state,
                stageNow: action.toNextStage || STAGE_OF_CHAT.SEARCH_USERS,
                foundUsers: null,
                error: null
            }
        }
        case CHAT_ACTION.FOUND_USERS: {
            return {
                ...state,
                foundUsers: action.users,
                error: null
            }
        }
        case CHAT_ACTION.CHAT_ERROR: {
            return {
                ...state,
                error: action.error,
            }
        }
        case CHAT_ACTION.CLEAR_STORE:{
            return initialState
        }
        default: {
            return state;
        }
    }
}


