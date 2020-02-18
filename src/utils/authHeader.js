const authHeader = () => {
	const user = JSON.parse(localStorage.getItem('currentUser'));

	if (user && user.token) {
		return {
			authorization: `Bearer ${user.token}`,
		};
	}
	return {};
};

export default authHeader;
