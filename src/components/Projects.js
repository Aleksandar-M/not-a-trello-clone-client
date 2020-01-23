import React, { useState } from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';
import styles from './Styles.module.css';

const Projects = (props) => {
	const color = 'black';
	const [activeItem, setActiveItem] = useState('messages');

	const handleItemClick = (e, { name }) => setActiveItem(name);

	return (
		<div className={styles.projects}>
			<Menu color={color} inverted vertical>
				<div className={styles.menuItem}>
					<div style={{ flex: 1 }}>
						<Menu.Item
							name="home"
							active={activeItem === 'home'}
							onClick={handleItemClick}
						/>
					</div>
					<div style={{
						position: 'absolute',
						right: '0px',
					}}
					>
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
			<div style={{ display: 'inline-block', textAlign: 'center' }}>
				<Button circular compact color="green" size="small">
					Create project
				</Button>
			</div>
		</div>
	);
};

export default Projects;
