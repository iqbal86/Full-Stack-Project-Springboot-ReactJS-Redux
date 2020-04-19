// Connecting to the backend. Inputting data to the backend host.

import axios from "axios"; // Axios library is used to manage API calls to the database.
import {
	GET_ERRORS,
	GET_PROJECT_TASKS,
	DELETE_PROJECT_TASK,
	GET_PROJECT_TASK,
} from "./types"; // set up React application to dispatch error on to application state.

export const addProjectTask = (project_task, history) => async (dispatch) => {
	try {
		await axios.post("http://localhost:8080/api/board", project_task);
		history.push("/");
		dispatch({
			// use dispatch function to clear out payload state from error.
			type: GET_ERRORS,
			payload: {},
		});
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data, // fetching JASON object from backend.
		});
	}
};

export const getBacklog = () => async (dispatch) => {
	const res = await axios.get("http://localhost:8080/api/board/all");
	dispatch({
		type: GET_PROJECT_TASKS,
		payload: res.data,
	});
};

export const deleteProjectTask = (project_id) => async (dispatch) => {
	if (
		window.confirm(
			`You are deleting project task ${project_id}, this action cannot be undone`
		)
	) {
		await axios.delete(`http://localhost:8080/api/board/${project_id}`); // use back tic when passing a parameter.
		dispatch({
			type: DELETE_PROJECT_TASK,
			payload: project_id,
		});
	}
};

export const getProjectTask = (project_id, history) => async (dispatch) => {
	try {
		const res = await axios.get(
			`http://localhost:8080/api/board/${project_id}`
		);
		dispatch({
			type: GET_PROJECT_TASK,
			payload: res.data,
		});
	} catch (error) {
		history.push("/");
	}
};
