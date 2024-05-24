import axios from "axios";
const BaseUrl = `http://localhost:8080/api/v1`;

export const Endpoints = {
	GET_USERS: `${BaseUrl}/users-list`,
	LOGIN_USER: `${BaseUrl}/login-user/`,
	REGISTER_USER: `${BaseUrl}/register-user/`,
	UPDATE_USER: `${BaseUrl}/edit-user/1`,
	DELETE_USER: `${BaseUrl}/delete-user/1`,

	GET_GROUPS: `${BaseUrl}/group-list/`,
	JOIN_GROUPS: `${BaseUrl}/join-groups/`,
	CREATE_GROUP: `${BaseUrl}/create-group`,
	AVAILABLE_GROUPS: `${BaseUrl}/available-groups`,
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

const getUsersOrExceptId = async (userId) => {
	try {

		let response;	
		if(userId){
			response = await axios.get(`${Endpoints.GET_USERS}/${userId}`);
		}else{
			response = await axios.get(`${Endpoints.GET_USERS}`);
		}
		const data = response.data;
		return data;
	} catch (error) {
		console.log("getUsers: Failed to fetch the Users:", error.message);
		return;
	}
};

const getAvailableGroupsToJoin = async (userId) => {
	try {
		if (userId) {
			const response = await axios.get(`${Endpoints.AVAILABLE_GROUPS}/${userId}`);
			const data = response.data;
			return data;
		}
	} catch (error) {
		console.log(
			"getAvailableGroupsToJoin: Failed to fetch the groups data:",
			error.message
		);
		return;
	}
};

const joinGroups = async (payload) => {
	try {
		if (payload) {
			const response = await axios.post(Endpoints.JOIN_GROUPS, payload);
			const data = response.data;
			return data;
		}
	} catch (error) {
		console.log(
			"joinGroups: Failed to join the group:",
			error.message
		);
		return;
	}
};

const createGroup = async (payload) => {
	try {
		if (payload) {
			const response = await axios.post(Endpoints.CREATE_GROUP, payload);
			const data = response.data;
			return data;
		}
	} catch (error) {
		console.log(
			"createGroup: Failed to create the group:",
			error.message
		);
		return;
	}
};

export { 
	getGroups, 
	getUsersOrExceptId,
	getAvailableGroupsToJoin, 
	joinGroups, 
	createGroup};
