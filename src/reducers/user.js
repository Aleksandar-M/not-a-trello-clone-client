import userServices from '../services/user';
import { alertErrorAction, alertSuccessAction } from './alert';

export const signInAction = (email, password, history) => async (dispatch) => {
	try {
		const res = await userServices.signIn(email, password);

		dispatch({
			type: 'SIGNIN',
			data: res.data.data,
		});

		dispatch(alertSuccessAction('Successfully signed in'));

		// Save current user with JWT in local storage
		// Keeps user signed in after page refresh
		localStorage.setItem('currentUser', JSON.stringify(res.data.data));

		// After successful sign in, redirect to main page
		history.push('/workspace');
	} catch (err) {
		dispatch(alertErrorAction(err.response.data.message));
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

		dispatch(alertSuccessAction('Successfully created account. Please sign in'));

		// Redirect to sign in page
		history.push('/');
	} catch (err) {
		dispatch(alertErrorAction(err.response.data.message));
	}
};

export const allUsersAction = () => async (dispatch) => {
	try {
		const res = await userServices.allUsers();
		console.log('all users action', res);

		dispatch({
			type: 'ALL_USERS',
			data: res.data.data.result,
		});
	} catch (err) {
		dispatch(alertErrorAction(err.response.data.message));
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
	case 'ALL_USERS': return {
		...state,
		users: action.data,
	};
	default:
		return state;
	}
};

export default reducer;
