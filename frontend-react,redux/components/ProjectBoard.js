import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectTaskItem from "./ProjectTask/ProjectTaskItem";
import { connect } from "react-redux"; // Connect store to this component to display data on the component.
import PropTypes from "prop-types"; // When API is called this proptypes loads the setup of project task.
import { getBacklog } from "../actions/projectTaskActions";

class ProjectBoard extends Component {
	// A lifecycle hook, in which this component will receive props from Redux.
	componentDidMount() {
		this.props.getBacklog();
	}
	render() {
		const { project_tasks } = this.props.project_tasks; // taking out data from Redux props and assigning it to a constant variable.

		let BoardContent;
		let todoItems = [];
		let inProgressItems = [];
		let doneItems = [];

		const BoardAlgorithm = (project_tasks) => {
			if (project_tasks.length < 1) {
				return (
					<div className="alert alert-info text-center" role="alert">
						No Project Tasks on this board
					</div>
				);
			} else {
				// extracting list of props to individual prop (project_task) and iterate through it.
				const tasks = project_tasks.map((project_task) => (
					<ProjectTaskItem key={project_task.id} project_task={project_task} /> // passing value of each prop (id backend variable) to the key value of the child class (ProjectTaskItem) then pass another extracted individual prop on to the project_task variable.
				));

				for (let i = 0; i < tasks.length; i++) {
					if (tasks[i].props.project_task.status == "TO_DO") {
						todoItems.push(tasks[i]);
					}
					if (tasks[i].props.project_task.status == "IN_PROGRESS") {
						inProgressItems.push(tasks[i]);
					}
					if (tasks[i].props.project_task.status == "DONE") {
						doneItems.push(tasks[i]);
					}
				}

				return (
					<React.Fragment>
						<div className="container">
							<div className="row">
								<div className="col-md-4">
									<div className="card text-center mb-2">
										<div className="card-header bg-secondary text-white">
											<h3>TO DO</h3>
										</div>
									</div>

									{todoItems}
								</div>
								<div className="col-md-4">
									<div className="card text-center mb-2">
										<div className="card-header bg-primary text-white">
											<h3>In Progress</h3>
										</div>
									</div>

									{inProgressItems}
								</div>
								<div className="col-md-4">
									<div className="card text-center mb-2">
										<div className="card-header bg-success text-white">
											<h3>Done</h3>
										</div>
									</div>

									{doneItems}
								</div>
							</div>
						</div>
					</React.Fragment>
				);
			}
		};

		BoardContent = BoardAlgorithm(project_tasks);

		return (
			<div className="container">
				<Link to="/addProjectTask" className="btn btn-primary mb-3">
					<i className="fas fa-plus-circle"> Create Project Task</i>
				</Link>
				<br />
				<hr />
				{BoardContent}
			</div>
		);
	}
}

ProjectBoard.propTypes = {
	// Proptypes is a required function for this component to work properly when an API(backend) is called.
	getBacklog: PropTypes.func.isRequired,
	project_tasks: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	// mapStateToProps is taking state as a parameter which is mapping this component state to the application(Redux) props.
	// map the satate of React application to the props of Redux.
	project_tasks: state.project_task,
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard); // connect this component to the store state.
