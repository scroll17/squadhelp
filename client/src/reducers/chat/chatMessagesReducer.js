import CHAT_ACTION from '../../actions/actionTypes/chatActionsTypes';

const initialState = {
    messages: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHAT_ACTION.ADD_MESSAGES: {
            return {
                ...state,
                messages: action.messages,
            }
        }
        case CHAT_ACTION.CLEAR_MESSAGES: {
            return {
                ...state,
                messages: [],
            }
        }
        default: {
            return state;
        }
    }
}


