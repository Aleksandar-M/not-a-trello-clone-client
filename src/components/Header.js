import React from 'react';
import {
	List, Image, Button, Dropdown, Icon,
} from 'semantic-ui-react';
import styles from './Styles.module.css';

const Header = (props) => {
	const options = [
		{ key: 'user', text: 'Account', icon: 'user' },
		{ key: 'settings', text: 'Settings', icon: 'settings' },
		{ key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
	];

	const trigger = (
		<span>
			<Icon name="user" />
			{' '}
			Hello, Bob
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

export default Header;
