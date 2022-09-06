import { combineReducers } from 'redux';

import auth from './auth.reducer';
import global from './global.reducer';
import coins from './coins.reducer';
import user from './user.reducer';
import notification from './notification.reducer';

export default combineReducers({
  auth,
  user,
  global,
  coins,
  notification,
});
