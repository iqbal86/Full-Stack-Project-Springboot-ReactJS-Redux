import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProjectTask } from "../../actions/projectTaskActions";

class ProjectTaskItem extends Component {
	onDeleteClick(project_id) {
		this.props.deleteProjectTask(project_id);
	}
	render() {
		const { project_task } = this.props; // importing project_task variable from the parent component (ProjectBoard.js).
		return (
			<div className="card mb-1 bg-light">
				<div className="card-header text-primary">ID: {project_task.id}</div>
				<div className="card-body bg-light">
					<h5 className="card-title">{project_task.summary}</h5>
					<p className="card-text text-truncate ">
						{project_task.acceptanceCriteria}
					</p>
					<Link
						to={`updateProjectTask/${project_task.id}`}
						className="btn btn-primary"
					>
						View / Update
					</Link>

					<button
						className="btn btn-danger ml-4"
						onClick={this.onDeleteClick.bind(this, project_task.id)}
					>
						Delete
					</button>
				</div>
			</div>
		);
	}
}

// Proptypes is a required function for this component to work properly when an API(backend) is called.
ProjectTaskItem.propTypes = {
	deleteProjectTask: PropTypes.func.isRequired,
};

// connect this component to the store state.
export default connect(null, { deleteProjectTask })(ProjectTaskItem);
