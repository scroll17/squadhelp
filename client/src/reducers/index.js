import { combineReducers } from 'redux';

import userReducer from './user/userReducer';
import adminReducer from './admin/adminReducer'

import contestReducer from './contest/contestReducer';

import chatReducer from './chat/chatReducer';
import chatFindReducer from './chat/chatFindReducer';
import chatMessagesReducer from './chat/chatMessagesReducer';
import chatConversationsReducer from './chat/chatConversationsReducer'

import dashboardReducer from './dashboard/dashboardReducer';

import dashboardContestsReducer from './dashboard/contest/dashboardContestsReducer';

import dashboardEntriesReducer from './dashboard/entries/dashboardEntriesReducer';


import { reducer as formReducer } from 'redux-form';

const appReducer = combineReducers({
  form: formReducer,

  userReducer,
  adminReducer,

  contestReducer,

  chatReducer,
  chatFindReducer,
  chatMessagesReducer,
  chatConversationsReducer,

  dashboardReducer,
  dashboardContestsReducer,
  dashboardEntriesReducer,
});

const rootReducer = (state, action) => appReducer(state, action);
export default rootReducer;
