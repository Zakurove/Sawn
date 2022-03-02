import { combineReducers } from "redux";
import leads from "./leads";
import errors from './errors';
import messages from './messages';
import auth from './auth';
import episodes from './episodes';

import loading from './loading';



export default combineReducers({
  leads,
  episodes,
  errors,
  messages,
  auth,
  loading
});
