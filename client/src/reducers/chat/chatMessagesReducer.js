import CHAT_ACTION from '../../actions/actionTypes/chatActionsTypes';

const initialState = {
    messages: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHAT_ACTION.NEW_MESSAGE: {
            return {
                ...state,
                messages: action.messages,
            }
        }
        default: {
            return state;
        }
    }
}


