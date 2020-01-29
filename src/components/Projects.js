import React, { useState, useEffect, useRef } from 'react';
import {
	Menu, Button, Icon,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import styles from './Styles.module.css';
import { projectsAction } from '../reducers/base';

// Custom hook for handling adding project input
const useOutsideClick = (ref, callback) => {
	const handleClick = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	});
};

const Projects = (props) => {
	const { projects, getProjectsNames } = props;

	const [activeItem, setActiveItem] = useState('messages');

	const [showProjectInput, setShowProjectInput] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const ref = useRef();

	useOutsideClick(ref, () => {
		if (showProjectInput) {
			setShowProjectInput(false);
			setInputValue('');
		}
	});

	useEffect(() => {
		getProjectsNames();
	}, [getProjectsNames]);

	const handleItemClick = (e, { name }) => setActiveItem(name);

	return (
		<nav>
			<Menu color="black" inverted vertical>
				{projects.map((el) => (
					<div key={el._id} className={styles.menuItemContainer}>
						<div className={styles.menuItem}>
							<Menu.Item
								name={el.name}
								active={activeItem === el.name}
								key={el._id}
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
				))}
			</Menu>
			{ showProjectInput
				? (
					<div ref={ref} className={styles.addProjectInput}>
						<input
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

const mapStateToProps = (state) => ({
	projects: state.projects,
});

const mapDispatchToProps = {
	getProjectsNames: projectsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
