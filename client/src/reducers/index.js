import { combineReducers } from 'redux';

import userReducers from './user/userReducer';

import contestReducers from './contest/contestReducers';

import chatReducers from './chat/chatReducer';
import chatFindReducer from './chat/chatFindReducer';
import chatMessagesReducer from './chat/chatMessagesReducer';
import chatConversationsReducer from './chat/chatConversationsReducer'

import dashboardReducer from './dashboard/dashboardReducer';
import dashboardContestsReducer from './dashboard/dashboardContestsReducer';


import { reducer as formReducer } from 'redux-form';

const appReducer = combineReducers({
  form: formReducer,

  userReducers,

  contestReducers,


  chatReducers,
  chatFindReducer,
  chatMessagesReducer,
  chatConversationsReducer,

  dashboardReducer,
  dashboardContestsReducer,
});

const rootReducer = (state, action) => appReducer(state, action);
export default rootReducer;
