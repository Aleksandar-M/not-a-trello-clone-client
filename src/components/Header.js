import React, { useEffect } from 'react';
import {
	List, Image, Button, Dropdown, Icon,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Styles.module.css';
import { signOutAction } from '../reducers/user';

const Header = (props) => {
	const { signOut, currentUser } = props;
	const history = useHistory();

	const options = [
		{ key: 'user', text: 'Account', icon: 'user' },
		{ key: 'settings', text: 'Settings', icon: 'settings' },
		{
			key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick: () => signOut(history),
		},
	];

	// useEffect(() => {
	// 	getAllusers for that project
	// 	getcurrentuser
	// });

	// TODO: use redux-perist middleware to persist redux state, currentUser after refresh is {}
	const trigger = (
		<span>
			<Icon name="user" />
			{currentUser}
		</span>
	);

	return (
		<header className={styles.header}>
			<div className={styles.left_header}>levo</div>
			<div className={styles.right_header}>
				<div className={styles.left_container}>
					<List divided horizontal size="tiny">
						<List.Item>
							<Image avatar src="/images/avatar/small/tom.jpg" />
							<List.Content>
								<List.Header>Tom</List.Header>
							</List.Content>
						</List.Item>
						<List.Item>
							<Image avatar src="/images/avatar/small/christian.jpg" />
							<List.Content>
								<List.Header>Christian Rocha</List.Header>
							</List.Content>
						</List.Item>
						<List.Item>
							<Image avatar src="/images/avatar/small/matt.jpg" />
							<List.Content>
								<List.Header>Matt</List.Header>
							</List.Content>
						</List.Item>
						<List.Item>
							<Button circular compact color="green" size="small">
								Add user
							</Button>
						</List.Item>
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
});

const mapDispatchToProps = {
	signOut: signOutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
