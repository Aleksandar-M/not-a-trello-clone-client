import userServices from '../services/user';

export const signInAction = (email, password, history) => async (dispatch) => {
	try {
		const res = await userServices.signIn(email, password);

		dispatch({
			type: 'SIGNIN',
			data: res.data.data,
		});

		// After successful sign in, redirect to main page
		history.push('/workspace');
	} catch (err) {
		console.log(err);
	}
};

export const signOutAction = (history) => {
	userServices.signOut();

	// After sign out, redirect to sign in page
	history.push('/');
	return {
		type: 'SIGNOUT',
	};
};

export const signUpAction = (email, password, history) => async (dispatch) => {
	try {
		const res = await userServices.signUp(email, password);
		console.log(res);
		dispatch({
			type: 'SIGNUP',
		});

		// Redirect to sign in page
		history.push('/');
	} catch (err) {
		console.log(err);
	}
};

const reducer = (state = { currentUser: {}, isLoggedIn: false, users: [] }, action) => {
	switch (action.type) {
	case 'SIGNIN':
		return {
			...state,
			isLoggedIn: true,
			currentUser: action.data,
		};
	case 'SIGNOUT': return {
		...state,
		currentUser: {},
		isLoggedIn: false,
	};
	case 'SIGNUP': return {
		...state,
		isLoggedIn: false,
		currentUser: {},
	};
	default:
		return state;
	}
};

export default reducer;
