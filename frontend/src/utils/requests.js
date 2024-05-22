import axios from "axios";
const BaseUrl = `localhost:8080/api/v1/`;

const Endpoints = {
	GET_USERS: `${BaseUrl}/users-list/`,
	GET_USER_BY_ID: `${BaseUrl}/user/1`,
	ADD_USER: `${BaseUrl}/add-user`,
	UPDATE_USER: `${BaseUrl}/edit-user/1`,
	DELETE_USER: `${BaseUrl}/delete-user/1`,
};

// const getUsers = async () => {
// 	try {
// 		const response = await axios.get(Endpoints.GET_USERS);
// 		const data = response.data;
// 		return data;
// 	} catch (error) {
// 		console.log("getUsers: Failed to fetch the Users:", error.message);
// 		return;
// 	}
// };

const userLogin = async (payload) => {
	console.log("userLogin", payload);
	try {
		if (payload) {
			const response = await axios.get(
				`${Endpoints.GET_USER_BY_ID}/${payload?.id}`
			);
			const data = response.data;
			return data;
		}
	} catch (error) {
		console.log(
			"userLogin: Failed to fetch the user data:",
			error.message
		);
		return;
	}
};

const registerUser = async (payload) => {
	console.log("registerUser", payload);
	try {
		if (payload) {
			const response = await axios.post(Endpoints.ADD_USER, payload);
			const data = response.data;
			return data;
		}
	} catch (error) {
		console.log("registerUser: Failed to register the user:", error.message);
		return;
	}
};

const updateUserProfile = async (payload) => {
	console.log("updateUserProfile", payload);
	try {
		if (payload) {
			const response = await axios.patch(
				`${Endpoints.UPDATE_USER}/${payload?.id}`,
				payload
			);
			const data = response.data;
			return data;
		}
	} catch (error) {
		console.log("updateUserProfile: Failed to update the user profile:", error.message);
		return;
	}
};

const deleteUserAccount = async (payload) => {
	console.log("deleteUserAccount", payload);
	try {
		if (payload) {
			const response = await axios.patch(
				`${Endpoints.DELETE_USER}/${payload?.id}`,
				payload
			);
			const data = response.data;
			return data;
		}
	} catch (error) {
		console.log("deleteUserAccount: Failed to delete the user account:", error.message);
		return;
	}
};

export { userLogin, registerUser, updateUserProfile, deleteUserAccount };
