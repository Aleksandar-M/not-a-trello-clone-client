import React, { useState } from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';
import styles from './Styles.module.css';

const Projects = (props) => {
	const [activeItem, setActiveItem] = useState('messages');

	const handleItemClick = (e, { name }) => setActiveItem(name);

	return (
		<nav>
			<Menu color="black" inverted vertical>
				<div className={styles.menuItemContainer}>
					<div className={styles.menuItem}>
						<Menu.Item
							name="home"
							active={activeItem === 'home'}
							onClick={handleItemClick}
						/>
					</div>
					<div className={styles.menuItemRemove}>
						<Button animated="fade" circular color="red" size="small">
							<Button.Content visible>
							</Button.Content>
							<Button.Content hidden>
								<Icon name="remove" />
							</Button.Content>
						</Button>
					</div>
				</div>

				<Menu.Item
					name="messages"
					active={activeItem === 'messages'}
					onClick={handleItemClick}
				/>
				<Menu.Item
					name="friends"
					active={activeItem === 'friends'}
					onClick={handleItemClick}
				/>

			</Menu>
			<div className={styles.addProjectBtn}>
				<Button circular compact color="green" size="small">
					Create project
				</Button>
			</div>
		</nav>
	);
};

export default Projects;
