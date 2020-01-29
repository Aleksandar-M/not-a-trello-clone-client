import projects from '../services/projects';

export const projectsAction = () => async (dispatch) => {
	const res = await projects.allProjectsNames();
	dispatch({
		type: 'PROJECTS',
		data: res.data.data.result,
	});
};

const reducer = (state = { projects: [], users: [] }, action) => {
	switch (action.type) {
	case 'PROJECTS':
		return {
			...state,
			projects: action.data,
		};
	default:
		return state;
	}
};

export default reducer;
