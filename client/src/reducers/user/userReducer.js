import ACTION from '../../actions/actionTypes/actionsTypes';

const initialState = {
  isFetching: null,
  error: null,
  user: null,
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


