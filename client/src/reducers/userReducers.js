import ACTION from '../actions/actiontsTypes';

const initialState = {
  isFetching: null,
  error: null,
  user: null,
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.USERS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null
      }
    }
    case ACTION.USERS_RESPONSE: {
      return {
        ...state,
        ...action,
        isFetching: false,
        error: null
      }
    }
    case ACTION.USERS_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    }
    default: {
      return state;
    }
  }
}


