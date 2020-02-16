import projectServices from '../services/projects';

export const projectsAction = () => async (dispatch) => {
	const res = await projectServices.allProjectsNames();
	dispatch({
		type: 'PROJECTS',
		data: res.data.data.result,
	});
};

export const activeProjectAction = (projectId) => ({
	type: 'ACTIVE_PROJECT',
	data: projectId,
});

export const projectDetailsAction = (projectId) => async (dispatch) => {
	console.log('id from action', projectId);
	const res = await projectServices.projectDetails(projectId);
	console.log('res from action', res);
	dispatch({
		type: 'PROJECT_DETAILS',
		data: res.data.data.result,
	});
};

export const tabsAction = (projectId) => async (dispatch) => {
	const res = await projectServices.allTabs(projectId);
	console.log('res from tabs action', res);
	dispatch({
		type: 'ALL_TABS',
		data: res.data.data.result,
	});
};

const reducer = (state = {
	projects: [], projectDetails: [], isLoading: true, activeProject: '', allTabs: [],
}, action) => {
	switch (action.type) {
	case 'PROJECTS':
		return {
			...state,
			projects: action.data,
		};
	case 'ACTIVE_PROJECT':
		return {
			...state,
			activeProject: action.data,
			isLoading: true,
		};
	case 'PROJECT_DETAILS':
		return {
			...state,
			projectDetails: action.data,
			isLoading: false,
		};
	case 'ALL_TABS':
		return {
			...state,
			allTabs: action.data,
		};
	default:
		return state;
	}
};

export default reducer;
