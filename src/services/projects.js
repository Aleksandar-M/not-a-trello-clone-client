import axios from 'axios';
import authHeader from '../utils/authHeader';

const baseUrl = 'http://localhost:8000/api/projects';

const allProjectsNames = async () => {
	try {
		const result = await axios({
			method: 'GET',
			url: `${baseUrl}`,
			headers: authHeader(),
		});

		console.log(result);
		return result;
	} catch (err) {
		console.log(err);
	}
};

const addNewProject = async (newProject, val, callback) => {
	try {
		const result = await axios({
			method: 'POST',
			url: `${baseUrl}`,
			headers: authHeader(),
			data: { name: newProject },
		});

		// Change fetchAgain state to trigger re-render
		callback(!val);

		return result.data;
	} catch (err) {
		console.log(err);
	}
};

const removeProject = async (projectId, val, callback) => {
	try {
		const result = await axios({
			method: 'DELETE',
			url: `${baseUrl}/${projectId}`,
			headers: authHeader(),
		});

		// Change fetchAgain state to trigger re-render
		callback(!val);

		return result;
	} catch (err) {
		console.log(err);
	}
};

const projectDetails = async (projectId) => {
	try {
		const result = await axios({
			method: 'GET',
			url: `${baseUrl}/${projectId}/cards/`,
			headers: authHeader(),
		});

		console.log('result from axios', result);
		return result;
	} catch (err) {
		console.log(err);
	}
};

const addUserToProject = async (projectId, user, val, callback) => {
	try {
		const result = await axios({
			method: 'PATCH',
			url: `${baseUrl}/${projectId}/userToProject/`,
			headers: authHeader(),
			data: { userId: user },
		});

		// Change fetchAgain state to trigger re-render
		callback(!val);

		console.log('result from axios', result);
		return result;
	} catch (err) {
		console.log(err);
	}
};

const allTabs = async (projectId) => {
	try {
		const result = await axios({
			method: 'GET',
			url: 'http://localhost:8000/api/tabs',
			headers: authHeader(),
		});

		console.log('result from axios', result);
		return result;
	} catch (err) {
		console.log(err);
	}
};

const addNewTab = async (project, newTab, val, callback) => {
	try {
		const result = await axios({
			method: 'POST',
			url: `${baseUrl}/${project}/tabs`,
			headers: authHeader(),
			data: { name: newTab },
		});

		// Change fetchAgain state to trigger re-render
		callback(!val);

		return result.data;
	} catch (err) {
		console.log(err);
	}
};

const addNewCard = async (projectId, tabId, card, val, callback) => {
	try {
		const result = await axios({
			method: 'POST',
			url: `${baseUrl}/${projectId}/tabs/${tabId}/cards`,
			headers: authHeader(),
			data: card,
		});

		// Change fetchAgain state to trigger re-render
		callback(!val);

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
	addUserToProject,
};
