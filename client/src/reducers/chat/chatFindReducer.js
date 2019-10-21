import CHAT_ACTION from '../../actions/actionTypes/chatActionsTypes';

const initialState = {
    foundUsers: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHAT_ACTION.FOUND_USERS: {
            return {
                ...state,
                foundUsers: action.users,
            }
        }
        case CHAT_ACTION.CLEAR_FOUND_USERS: {
            return {
                ...state,
                foundUsers: [],
            }
        }
        default: {
            return state;
        }
    }
}


