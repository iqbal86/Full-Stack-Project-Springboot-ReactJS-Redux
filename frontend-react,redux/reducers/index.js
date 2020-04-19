// A ROOT REDUCER is Meeting place for all reducers. Inputting data on to the React state.

import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import projectTaskReducer from "./projectTaskReducer";

export default combineReducers({
	errors: errorsReducer,
	project_task: projectTaskReducer,
});
