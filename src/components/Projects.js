import React, { useState, useEffect, useRef } from 'react';
import {
	Menu, Button, Icon,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import styles from './Styles.module.css';
import { projectsAction, activeProjectAction } from '../reducers/base';
import { allUsersAction } from '../reducers/user';
import projectsServices from '../services/projects';
import useOutsideClick from '../hooks/index';


const Projects = (props) => {
	const {
		projects, getProjectsNames, setActiveProject, users, allUsers,
	} = props;

	const [activeItem, setActiveItem] = useState('messages');

	const [showProjectInput, setShowProjectInput] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const ref = useRef();

	const [fetchAgain, setFetchAgain] = useState(true);

	const user = JSON.parse(localStorage.getItem('currentUser')).email;

	// Get current user details, take property assignedToProjects, get their details
	const [userDetails] = user && users.filter((el) => el.email === user);
	const userProjects = userDetails && userDetails.assignedToProjects;
	const filteredProjects = userProjects && projects.filter((el) => userProjects.includes(el._id));

	useOutsideClick(ref, () => {
		if (showProjectInput) {
			setShowProjectInput(false);
			setInputValue('');
		}
	});

	useEffect(() => {
		allUsers();
		getProjectsNames();
	}, [allUsers, getProjectsNames, fetchAgain]);

	const handleItemClick = (projectId, projectName) => {
		setActiveItem(projectName);
		console.log(projectName, projectId);

		setActiveProject(projectId);
	};

	const handleCreateProject = () => {
		// Send POST request and AFTER adding, change state to trigger useEffect
		projectsServices.addNewProject(inputValue, fetchAgain, setFetchAgain);

		// Remove project input field
		setShowProjectInput(false);
		setInputValue('');
	};

	const handleRemoveProject = (projectId) => {
		// Send DELETE request and AFTER deleting, change state to trigger useEffec
		projectsServices.removeProject(projectId, fetchAgain, setFetchAgain);

		// Trigger other components re-render
		setActiveProject('');
	};

	return (
		<nav>
			{ filteredProjects
				&& filteredProjects.length > 0
				&& (
					<Menu color="black" inverted vertical>
						{filteredProjects.map((el) => (
							<div key={el._id} className={styles.menuItemContainer}>
								<div className={styles.menuItem}>
									<Menu.Item
										name={el.name}
										active={activeItem === el.name}
										key={el._id}
										onClick={() => handleItemClick(el._id, el.name)}
									/>
								</div>
								<div className={styles.menuItemRemove}>
									<Button
										animated="fade"
										circular
										color="red"
										size="small"
										onClick={() => handleRemoveProject(el._id)}
									>
										<Button.Content visible>
										</Button.Content>
										<Button.Content hidden>
											<Icon name="remove" />
										</Button.Content>
									</Button>
								</div>
							</div>
						))}
					</Menu>
				)}

			{ showProjectInput
				? (
					<div className={styles.addProjectInput}>
						<input
							ref={ref}
							type="text"
							style={{ width: '150px' }}
							value={inputValue}
							onChange={({ target }) => setInputValue(target.value)}
						/>
						{' '}
						<Button
							style={{ flex: 1 }}
							size="tiny"
							inverted
							color="violet"
							onClick={handleCreateProject}
						>
							Add
						</Button>
					</div>
				)
				: (
					<div className={styles.addProjectBtn}>
						<Button
							onClick={() => setShowProjectInput(true)}
							circular
							compact
							color="green"
							size="small"
						>
							Create project
						</Button>
					</div>
				)}
		</nav>
	);
};

const mapStateToProps = (state) => {
	console.log(state);
	return {
		projects: state.base.projects,
		users: state.users.users,
	};
};

const mapDispatchToProps = {
	getProjectsNames: projectsAction,
	setActiveProject: activeProjectAction,
	allUsers: allUsersAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
