import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import discussion from './discussion';

export default combineReducers({
  alert,
  auth,
  profile,
  discussion,
});
