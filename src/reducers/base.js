import projectServices from '../services/projects';
import { alertErrorAction } from './alert';

export const projectsAction = () => async (dispatch) => {
	try {
		const res = await projectServices.allProjectsNames();

		dispatch({
			type: 'PROJECTS',
			data: res.data.data.result,
		});
	} catch (err) {
		dispatch(alertErrorAction(err.response.data.message));
	}
};

export const projectDetailsAction = (projectId) => async (dispatch) => {
	try {
		const res = await projectServices.projectDetails(projectId);

		dispatch({
			type: 'PROJECT_DETAILS',
			data: res.data.data.result,
		});
	} catch (err) {
		dispatch(alertErrorAction(err.response.data.message));
	}
};

export const tabsAction = (projectId) => async (dispatch) => {
	try {
		const res = await projectServices.allTabs();

		dispatch({
			type: 'ALL_TABS',
			data: res.data.data.result,
		});
	} catch (err) {
		dispatch(alertErrorAction(err.response.data.message));
	}
};

export const activeProjectAction = (projectId) => ({
	type: 'ACTIVE_PROJECT',
	data: projectId,
});

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
