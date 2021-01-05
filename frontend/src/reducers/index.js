import { combineReducers } from "redux";
import leads from "./leads";
import errors from './errors';
import messages from './messages';
import auth from './auth';
import sets from './sets';
import clusters from './clusters';
import loading from './loading';



export default combineReducers({
  leads,
  sets,
  clusters,
  errors,
  messages,
  auth,
  loading
});
