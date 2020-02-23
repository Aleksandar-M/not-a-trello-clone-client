import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
	Button, Loader,
} from 'semantic-ui-react';
import styles from './Styles.module.css';
import Tab from './Tab';
import { projectDetailsAction, tabsAction } from '../reducers/base';
import useOutsideClick from '../hooks/index';
import projectsServices from '../services/projects';


const Content = (props) => {
	const {
		activeProject, projectDetails, getProjectDetails, loading, getTabs, allTabs,
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
		}
	}, [getProjectDetails, getTabs, activeProject, fetchAgain]);

	const handleCreateTab = () => {
		// Send POST request and AFTER adding, change state to trigger useEffect
		projectsServices.addNewTab(
			activeProject,
			inputValue,
			fetchAgain,
			setFetchAgain,
		);

		// Remove tab input field
		setShowTabInput(false);
		setInputValue('');
	};

	return (
		<div className={styles.content}>
			{activeProject
			&& loading
				? <Loader active size="massive" inverted />
				: activeProject
				&& projectTabs
				&& projectDetails.map((el, index) => (
					<Tab
						key={projectTabs[index]._id}
						tabId={projectTabs[index]._id}
						fetchAgain={fetchAgain}
						setFetchAgain={setFetchAgain}
						tabName={projectTabs[index].name}
						currentTabIndex={index}
					/>
				))}

			{activeProject
			&& !loading
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
							color="purple"
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
		activeProject: state.base.activeProject,
		projectDetails: state.base.projectDetails,
		allTabs: state.base.allTabs,
		loading: state.base.isLoading,
	};
};

const mapDispatchToProps = {
	getProjectDetails: projectDetailsAction,
	getTabs: tabsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
