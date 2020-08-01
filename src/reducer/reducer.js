import {combineReducers} from "redux";
import {reducer as data} from "./data/data.js";
import {reducer as app} from "./app/app.js";
import {reducer as user} from "./user/user.js";
import {reducer as error} from "./errors/errors.js";
import NameSpace from "./name-space.js";


export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.APP]: app,
  [NameSpace.USER]: user,
  [NameSpace.ERROR]: error,
});
