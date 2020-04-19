import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // When API is called this proptypes loads the setup of project task.
import { connect } from "react-redux"; // Connect store to this component to display data on the component.
import { addProjectTask } from "../../actions/projectTaskActions";
import classnames from "classnames";

class AddProjectTask extends Component {
	constructor() {
		super();
		this.state = {
			summary: "",
			acceptanceCriteria: "",
			status: "",
			errors: {},
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	// A lifecycle hook, in which this component will receive props from Redux.
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		const newProjectTask = {
			summary: this.state.summary,
			acceptanceCriteria: this.state.acceptanceCriteria,
			status: this.state.status,
		};
		//	console.log(newProjectTask);
		this.props.addProjectTask(newProjectTask, this.props.history); // newProjectTask is the object that we're getting from the props.
	}

	render() {
		const { errors } = this.state; // extrtacting(receiving) errors to the components from the current state in React.
		return (
			<div className="addProjectTask">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/" className="btn btn-light">
								Back to Board
							</Link>
							<h4 className="display-4 text-center">
								Add /Update Project Task
							</h4>
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<input
										type="text"
										// add bootstrap "is-invalid" class to the input field every time we have error from state.
										className={classnames("form-control form-control-lg", {
											"is-invalid": errors.summary,
										})}
										name="summary"
										value={this.state.summary}
										placeholder="Project Task summary"
										onChange={this.onChange}
									/>
									{errors.summary && ( // display value(message) of summary (varaible of backend) from the state in React.
										<div className="invalid-feedback">{errors.summary}</div>
									)}
								</div>
								<div className="form-group">
									<textarea
										className="form-control form-control-lg"
										placeholder="Acceptance Criteria"
										name="acceptanceCriteria"
										value={this.state.acceptanceCriteria}
										onChange={this.onChange}
									/>
								</div>
								<div className="form-group">
									<select
										className="form-control form-control-lg"
										name="status"
										value={this.state.status}
										onChange={this.onChange}
									>
										<option value="">Select Status</option>
										<option value="TO_DO">TO DO</option>
										<option value="IN_PROGRESS">IN PROGRESS</option>
										<option value="DONE">DONE</option>
									</select>
								</div>
								<input
									type="submit"
									className="btn btn-primary btn-block mt-4"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddProjectTask.propTypes = {
	// Proptypes is a required function for this component to work properly when an API(backend) is called.
	addProjectTask: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
};

// mapStateToProps is taking state of the application as a parameter which is mapping this component state to the application(Redux) props.
// map the satate of React application to the props of Redux.
const mapStateToProps = (state) => ({
	errors: state.errors,
});

export default connect(mapStateToProps, { addProjectTask })(AddProjectTask); // connect this component to the store state.
