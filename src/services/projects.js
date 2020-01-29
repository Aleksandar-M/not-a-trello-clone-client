import axios from 'axios';

const baseUrl = 'http://localhost:8000/api';

const allProjectsNames = async () => {
	try {
		const result = await axios.get(`${baseUrl}/projects`);
		console.log(result);
		return result;
	} catch (err) {
		console.log(err);
	}
};

export default {
	allProjectsNames,
};
