// Fetching data from payload(state of Redux)
import { GET_ERRORS } from "../actions/types";

const initialState = {}; // initialState of application is empty because we have no errors yet.

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ERRORS:
			return action.payload;

		default:
			return state;
	}
}
