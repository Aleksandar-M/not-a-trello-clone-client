import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/projects';

const allProjectsNames = async () => {
	try {
		const result = await axios.get(`${baseUrl}`);
		console.log(result);
		return result;
	} catch (err) {
		console.log(err);
	}
};

const addNewProject = async (newProject) => {
	try {
		const result = await axios.post(`${baseUrl}`, { name: newProject });
		console.log(result.data);
		return result.data;
	} catch (err) {
		console.log(err);
	}
};

const removeProject = async (projectId) => {
	try {
		const result = await axios.delete(`${baseUrl}/${projectId}`);
		console.log(result);
		return result;
	} catch (err) {
		console.log(err);
	}
};

export default {
	allProjectsNames,
	addNewProject,
	removeProject,
};
