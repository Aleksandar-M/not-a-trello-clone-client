import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
	Button,
} from 'semantic-ui-react';
import styles from './Styles.module.css';
import Tab from './Tab';
import { projectDetailsAction, tabsAction } from '../reducers/base';
import useOutsideClick from '../hooks/index';
import projectsServices from '../services/projects';


const Content = (props) => {
	const {
		activeProject, projectDetails, getProjectDetails, getTabs, allTabs,
	} = props;
	const projectTabs = allTabs.filter((el) => el.project === activeProject);
	console.log('project tabs', projectTabs);

	const [showTabInput, setShowTabInput] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const ref = useRef();
	const [fetchAgain, setFetchAgain] = useState(true);


	useOutsideClick(ref, () => {
		if (showTabInput) {
			setShowTabInput(false);
			setInputValue('');
		}
	});

	useEffect(() => {
		if (activeProject) {
			getProjectDetails(activeProject);
			getTabs(activeProject);
			setFetchAgain(false);
		}
	}, [activeProject, fetchAgain]);

	const handleCreateTab = () => {
		// Send POST request
		projectsServices.addNewTab(activeProject, inputValue);

		// Remove tab input field
		setShowTabInput(false);
		setInputValue('');

		// Render again, trigger useEffect
		setFetchAgain(true);
	};

	return (
		<div className={styles.content}>
			{activeProject
			&& projectTabs
			&& projectDetails.map((el, index) => (
				<Tab
					key={projectTabs[index]._id}
					tabName={projectTabs[index].name}
					currentTabIndex={index}
				/>
			))}

			{ activeProject
			&& (showTabInput
				? (
					<div>
						<input
							ref={ref}
							type="text"
							style={{ width: '150px', height: '30px' }}
							value={inputValue}
							onChange={({ target }) => setInputValue(target.value)}
						/>
						{' '}
						<Button
							style={{ flex: 1 }}
							size="tiny"
							inverted
							color="violet"
							onClick={handleCreateTab}
						>
							Add
						</Button>
					</div>
				)
				: (
					<div>
						<Button
							onClick={() => setShowTabInput(true)}
							circular
							compact
							color="purple"
							size="big"
						>
							Create tab
						</Button>
					</div>
				))}
		</div>
	);
};

const mapStateToProps = (state) => {
	console.log('state from content', state);
	return {
		activeProject: state.activeProject,
		projectDetails: state.projectDetails,
		allTabs: state.allTabs,
	};
};

const mapDispatchToProps = {
	getProjectDetails: projectDetailsAction,
	getTabs: tabsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
