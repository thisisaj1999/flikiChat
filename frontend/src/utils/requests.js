import axios from "axios";
const BaseUrl = `http://localhost:8080/api/v1`;

const Endpoints = {
	GET_USERS: `${BaseUrl}/users-list/`,
	LOGIN_USER: `${BaseUrl}/login-user/`,
	REGISTER_USER: `${BaseUrl}/register-user/`,
	UPDATE_USER: `${BaseUrl}/edit-user/1`,
	DELETE_USER: `${BaseUrl}/delete-user/1`,

	GET_GROUPS: `${BaseUrl}/group-list/`
};

// Login Requests
const userLogin = async (payload) => {
	console.log("userLogin", payload);
	try {
		if (payload) {
			const response = await axios.post(Endpoints.LOGIN_USER, payload);
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

// Register Requests
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

const registerUser = async (payload) => {
	try {
		if (payload) {
			const response = await axios.post(Endpoints.REGISTER_USER, payload);
			const data = response.data;
			return data;
		}
	} catch (error) {
		console.log("registerUser: Failed to register the user:", error.message);
		return;
	}
};


// Dashboard Requests
const userLogout = async () => {
	console.log('LoggedOut')
}

const getUsers = async () => {
	try {
		const response = await axios.get(Endpoints.GET_USERS);
		const data = response.data;
		return data;
	} catch (error) {
		console.log("getUsers: Failed to fetch the Users:", error.message);
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



export { userLogin, getGroups, registerUser, userLogout, getUsers, updateUserProfile, deleteUserAccount };
