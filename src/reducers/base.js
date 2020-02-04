import projects from '../services/projects';

export const projectsAction = () => async (dispatch) => {
	const res = await projects.allProjectsNames();
	dispatch({
		type: 'PROJECTS',
		data: res.data.data.result,
	});
};

export const activeProjectAction = (projectId) => ({
	type: 'ACTIVE_PROJECT',
	data: projectId,
});

const reducer = (state = { projects: [], activeProject: '', users: [] }, action) => {
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
		};
	default:
		return state;
	}
};

export default reducer;
