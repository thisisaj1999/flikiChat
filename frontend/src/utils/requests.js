import axios from "axios";
const BaseUrl = `http://localhost:8080/api/v1`;

export const Endpoints = {
	LOGIN_USER: `${BaseUrl}/login-user/`,
	REGISTER_USER: `${BaseUrl}/register-user/`,
	GET_GROUPS: `${BaseUrl}/group-list/`,
};

// Requests
const getGroups = async () => {
	try {
		const response = await axios.get(Endpoints.GET_GROUPS);
		const data = response.data;
		return data;
	} catch (error) {
		console.log("getUsers: Failed to fetch the Users:", error.message);
		return;
	}
};


export { getGroups };
