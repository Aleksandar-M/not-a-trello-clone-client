export const alertSuccessAction = (message) => (dispatch) => {
	dispatch({
		type: 'SUCCESS',
		message,
	});

	setTimeout(() => dispatch({
		type: 'CLEAR',
	}), 2000);
};

export const alertErrorAction = (message) => (dispatch) => {
	dispatch({
		type: 'ERROR',
		message,
	});

	setTimeout(() => dispatch({
		type: 'CLEAR',
	}), 2000);
};

export const alertClearAction = () => ({
	type: 'CLEAR',
});

const reducer = (state = { message: '', type: '' }, action) => {
	switch (action.type) {
	case 'SUCCESS':
		return {
			...state,
			type: action.type,
			message: action.message,
		};
	case 'ERROR':
		return {
			...state,
			type: action.type,
			message: action.message,
		};
	case 'CLEAR':
		return {};
	default:
		return state;
	}
};

export default reducer;
