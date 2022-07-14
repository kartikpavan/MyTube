export const userAccessToken = () => {
	const accessToken =
		localStorage.getItem("userToken") !== "undefined"
			? JSON.parse(localStorage.getItem("userToken"))
			: localStorage.clear();
	return accessToken;
};

export const fetchUserDetails = () => {
	const user =
		localStorage.getItem("user") !== "undefined"
			? JSON.parse(localStorage.getItem("user"))
			: localStorage.clear();
	return user;
};
