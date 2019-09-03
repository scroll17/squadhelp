import { combineReducers } from 'redux';

import userReducers from './userReducers';
import contestReducers from './contestReducers';
import chatReducers from './chatReducers';

import { reducer as formReducer } from 'redux-form';

const appReducer = combineReducers({
  userReducers,
  contestReducers,
  chatReducers,
  form: formReducer
});

const rootReducer = (state, action) => appReducer(state, action);
export default rootReducer;
