import { combineReducers } from 'redux';

import userReducers from './userReducer';

import contestReducers from './contest/contestReducers';

import chatReducers from './chat/chatReducer';
import chatFindReducer from './chat/chatFindReducer';
import chatMessagesReducer from './chat/chatMessagesReducer';
import chatConversationsReducer from './chat/chatConversationsReducer'

import dashboardReducer from './dashboard/dashboardReducer';


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

});

const rootReducer = (state, action) => appReducer(state, action);
export default rootReducer;
