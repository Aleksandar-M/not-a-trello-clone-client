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

const projectDetails = async (projectId) => {
	try {
		const result = await axios.get(`${baseUrl}/${projectId}/cards/`);
		console.log('result from axios', result);
		return result;
	} catch (err) {
		console.log(err);
	}
};

const allTabs = async (projectId) => {
	try {
		const result = await axios.get('http://localhost:8000/api/tabs');
		console.log('result from axios', result);
		return result;
	} catch (err) {
		console.log(err);
	}
};

const addNewTab = async (project, newTab) => {
	try {
		const result = await axios.post(`${baseUrl}/${project}/tabs`, { name: newTab });
		console.log(result.data);
		return result.data;
	} catch (err) {
		console.log(err);
	}
};

const addNewCard = async (projectId, tabId, card) => {
	try {
		const result = await axios.post(`${baseUrl}/${projectId}/tabs/${tabId}/cards`, card);
		console.log(result.data);
		return result.data;
	} catch (err) {
		console.log(err);
	}
};

export default {
	allProjectsNames,
	addNewProject,
	removeProject,
	projectDetails,
	allTabs,
	addNewTab,
	addNewCard,
};
