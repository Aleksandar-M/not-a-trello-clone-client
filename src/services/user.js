import axios from 'axios';
import authHelper from '../utils/authHeader';

const baseUrl = 'http://localhost:8000/api/users';

const signIn = async (email, password) => {
	try {
		const result = await axios.post(`${baseUrl}/login`, { email, password });
		console.log(result);

		// Save current user with JWT in local storage
		// Keeps user signed in after page refresh
		localStorage.setItem('currentUser', JSON.stringify(result.data.data));

		return result;
	} catch (err) {
		console.log(err);
	}
};

const signUp = async (email, password) => {
	try {
		const result = await axios.post(`${baseUrl}/signup`, { email, password });
		console.log(result);

		return result;
	} catch (err) {
		console.log(err);
	}
};

const signOut = () => {
	localStorage.removeItem('currentUser');
};

const allUsers = async () => {
	try {
		const result = await axios({
			method: 'GET',
			url: `${baseUrl}`,
			headers: authHelper(),
		});

		console.log(result);

		return result;
	} catch (err) {
		console.log(err);
	}
};

export default {
	signIn,
	signOut,
	signUp,
	allUsers,
};
