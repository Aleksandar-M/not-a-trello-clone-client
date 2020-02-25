import React, { useEffect, useState } from 'react';
import {
	List, Dropdown, Icon,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Styles.module.css';
import { signOutAction, allUsersAction } from '../reducers/user';
import projectServices from '../services/projects';

const Header = (props) => {
	const {
		signOut, users, allUsers, activeProject,
	} = props;
	const history = useHistory();

	const t = new Date();
	const today = new Date(
		Date.UTC(t.getUTCFullYear(),
			t.getUTCMonth(),
			t.getUTCDate()),
	).toDateString();

	const [fetchAgain, setFetchAgain] = useState(true);

	const options = [
		{ key: 'user', text: 'Account', icon: 'user' },
		{ key: 'settings', text: 'Settings', icon: 'settings' },
		{
			key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick: () => signOut(history),
		},
	];

	const user = JSON.parse(localStorage.getItem('currentUser')).email;

	// Splitting users on those currently working on project and others
	const [usersOnProject,
		usersNotOnProject] = activeProject
								&& users.reduce((acc, el) => {
									if (el.assignedToProjects.includes(activeProject)) {
										acc[0].push(el);
									} else {
										acc[1].push(el);
									}

									return acc;
								}, [[], []]);

	useEffect(() => {
		allUsers();
	}, [allUsers, fetchAgain]);

	const trigger = (
		<span>
			<Icon name="user" />
			{user}
		</span>
	);

	const handleAddUser = (option) => {
		if (activeProject && option) {
			// Send PATCH request and AFTER update, change state to trigger useEffect
			projectServices.addUserToProject(activeProject, option._id, fetchAgain, setFetchAgain);
		}
	};

	return (
		<header className={styles.header}>
			<div className={styles.left_header}>{today}</div>
			<div className={styles.right_header}>
				<Icon name="users" size="big" style={{ paddingTop: '5px' }} />
				<div className={styles.left_container}>
					{activeProject
						? (
							<List divided horizontal size="big">
								{usersOnProject
									&& usersOnProject.map((el) => (
										<List.Item key={el._id}>
											<List.Header>{el.email.split('@')[0]}</List.Header>
										</List.Item>
									))}

								<List.Item>
									<Dropdown
										text="Add user"
										icon="add user"
										floating
										labeled
										button
										className="icon"
									>
										<Dropdown.Menu
											style={{ zIndex: '300' }}
										>
											<Dropdown.Header content="People You Might Know" />
											{usersNotOnProject
											&& usersNotOnProject.map((option) => (
												<Dropdown.Item
													key={option._id}
													text={option.email}
													value={option.email}
													// image={<Icon user />}
													onClick={() => handleAddUser(option)}
												/>
											))}
										</Dropdown.Menu>
									</Dropdown>
								</List.Item>
							</List>
						)
						: <span>Create new project or select existing to start working</span>}
				</div>
				<div className={styles.right_container}>
					<Dropdown fluid button trigger={trigger} options={options} />
				</div>

			</div>
		</header>
	);
};

const mapStateToProps = (state) => ({
	users: state.users.users,
	activeProject: state.base.activeProject,
});

const mapDispatchToProps = {
	signOut: signOutAction,
	allUsers: allUsersAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
