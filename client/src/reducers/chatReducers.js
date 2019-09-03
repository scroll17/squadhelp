import ACTION from '../actions/actiontsTypes';


const initialState = {
    isOpen: false,
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.CLOSE_OR_OPEN_CHAT: {
            return {
                ...state,
                isOpen: !state.isOpen,
                error: null
            }
        }
        default: {
            return state;
        }
    }
}


