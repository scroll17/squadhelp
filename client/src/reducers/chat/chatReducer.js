import CHAT_ACTION from '../../actions/actionTypes/chatActionsTypes';
import { STAGE_OF_CHAT } from "../../constants/chat";

const initialState = {
    stageNow: STAGE_OF_CHAT.BEGIN,
    isOpen: false,
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHAT_ACTION.STATUS_OF_CHAT: {
            return {
                ...state,
                isOpen: action.isOpen,
                error: null
            }
        }
        case CHAT_ACTION.TO_FIND_USERS_STAGE: {
            return {
                ...state,
                stageNow: STAGE_OF_CHAT.FIND_USERS,
                error: null
            }
        }
        case CHAT_ACTION.TO_NEXT_CHAT_STAGE: {
            return {
                ...state,
                stageNow: action.nextStage,
                error: null
            }
        }
        case CHAT_ACTION.CHAT_ERROR: {
            return {
                ...state,
                error: action.error,
            }
        }
        default: {
            return state;
        }
    }
}


