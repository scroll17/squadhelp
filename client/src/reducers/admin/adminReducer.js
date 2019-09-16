import ADMIN_ACTION from '../../actions/actionTypes/adminActionTypes';

const initialState = {
    users: [],
    entries: [],
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADMIN_ACTION.ALL_USERS: {
            return {
                ...state,
                users: action.users,
                error: null
            }
        }
        case ADMIN_ACTION.ALL_ENTRIES: {
            return {
                ...state,
                entries: action.entries,
                error: null
            }
        }
        case ADMIN_ACTION.ADMIN_ERROR: {
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


