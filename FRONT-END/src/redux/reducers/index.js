import { combineReducers } from "redux";

import { toast } from "./todo";

const rootReducer = combineReducers({
  toast,
});

export default rootReducer;
