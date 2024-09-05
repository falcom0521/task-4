// src/reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import taskReducer from "./TaskReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
});

export default rootReducer;
