import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './Styles.module.css';
import Tab from './Tab';
import { projectDetailsAction, tabsAction } from '../reducers/base';

const Content = (props) => {
	const {
		activeProject, projectDetails, getProjectDetails, getTabs, allTabs,
	} = props;
	const projectTabs = allTabs.filter((el) => el.project === activeProject);
	console.log('project tabs', projectTabs);

	useEffect(() => {
		if (activeProject) {
			getProjectDetails(activeProject);
			getTabs(activeProject);
		}
	}, [activeProject]);

	return (
		<div className={styles.content}>
			{activeProject
			&& projectTabs
			&& projectDetails.map((el, index) => (
				<Tab
					tabName={projectTabs[index].name}
					currentTabIndex={index}
				/>
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
