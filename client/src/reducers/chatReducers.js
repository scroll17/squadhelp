import ACTION from '../actions/actiontsTypes';


const initialState = {
    isOpen: false,
    isSearchUsers: false,
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.CLOSE_OR_OPEN_CHAT: {
            return {
                ...state,
                isOpen: action.isOpen,
                error: null
            }
        }
        case ACTION.SEARCH_USERS: {
            return {
                ...state,
                isSearchUsers: action.isSearchUsers,
                error: null
            }
        }
        case ACTION.CHAT_ERROR: {
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


