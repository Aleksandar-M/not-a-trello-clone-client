import axios from 'axios';

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

export default {
	signIn,
	signOut,
	signUp,
};
