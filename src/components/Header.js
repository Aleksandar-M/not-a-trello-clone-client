import React, { useEffect } from 'react';
import {
	List, Image, Button, Dropdown, Icon,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Styles.module.css';
import { signOutAction, allUsersAction } from '../reducers/user';

const Header = (props) => {
	const {
		signOut, currentUser, users, allUsers, activeProject,
	} = props;
	const history = useHistory();

	const options = [
		{ key: 'user', text: 'Account', icon: 'user' },
		{ key: 'settings', text: 'Settings', icon: 'settings' },
		{
			key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick: () => signOut(history),
		},
	];

	const user = JSON.parse(localStorage.getItem('currentUser')).email;

	const usersOnProject = activeProject
							&& users
								.filter((el) => el.assignedToProjects.includes(activeProject))
								.map((el) => el.email);

	useEffect(() => {
		allUsers();
	}, []);

	const trigger = (
		<span>
			<Icon name="user" />
			{user}
		</span>
	);

	return (
		<header className={styles.header}>
			<div className={styles.left_header}>levo</div>
			<div className={styles.right_header}>
				<Icon name="users" size="big" style={{ paddingTop: '5px' }} />
				<div className={styles.left_container}>

					<List divided horizontal size="big">
						{usersOnProject
							&& usersOnProject.map((el) => (
								<List.Item>
									<List.Header>{el.split('@')[0]}</List.Header>
								</List.Item>
							))}
					</List>
				</div>
				<div className={styles.right_container}>
					<Dropdown fluid button trigger={trigger} options={options} />
				</div>

			</div>
		</header>
	);
};

const mapStateToProps = (state) => ({
	currentUser: state.users.currentUser.email,
	users: state.users.users,
	activeProject: state.base.activeProject,
});

const mapDispatchToProps = {
	signOut: signOutAction,
	allUsers: allUsersAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
