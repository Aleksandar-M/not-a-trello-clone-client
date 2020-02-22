import axios from 'axios';
import authHelper from '../utils/authHeader';

const baseUrl = 'http://localhost:8000/api/users';

const signIn = (email, password) => axios.post(`${baseUrl}/login`, { email, password });

const signUp = (email, password) => axios.post(`${baseUrl}/signup`, { email, password });

const signOut = () => {
	localStorage.removeItem('currentUser');
};

const allUsers = () => axios({
	method: 'GET',
	url: `${baseUrl}`,
	headers: authHelper(),
});

export default {
	signIn,
	signOut,
	signUp,
	allUsers,
};
