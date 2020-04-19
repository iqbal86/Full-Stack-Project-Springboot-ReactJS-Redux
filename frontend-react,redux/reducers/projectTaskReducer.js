// Fetching data from component to payload(state). Which will become props.
import {
	GET_PROJECT_TASKS,
	DELETE_PROJECT_TASK,
	GET_PROJECT_TASK,
} from "../actions/types";

const intitialState = {
	project_tasks: [],
	project_task: {},
};

export default function (state = intitialState, action) {
	switch (action.type) {
		case GET_PROJECT_TASKS:
			return {
				...state,
				project_tasks: action.payload,
			};

		case GET_PROJECT_TASK:
			return {
				...state,
				project_task: action.payload,
			};

		case DELETE_PROJECT_TASK:
			return {
				...state,
				project_tasks: state.project_tasks.filter(
					(project_task) => project_task.id !== action.payload // update the state if the API call was successful.
				),
			};

		default:
			return state;
	}
}
