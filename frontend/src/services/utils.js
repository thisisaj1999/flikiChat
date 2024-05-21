const baseURL = `http://localhost:8080/api/v1`;

const getAllUsers = async () => {
	const usersData = await fetch(`${baseURL}/users-list`);
	return usersData.json();
};

const getUserById = async (id) => {
	const userData = await fetch(`${baseURL}/user/${id}`);
	return userData.json();
};

const addUser = async (data) => {
	const addUserData = await fetch(`${baseURL}/add-user`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	return addUserData.json();
};

const updateUser = async (data, id) => {
	const updateUserData = await fetch(`${baseURL}/edit-user/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	return updateUserData.json();
};

const deleteUser = async (id) => {
	const deleteUserData = await fetch(`${baseURL}/delete-user/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	});
	return deleteUserData.json();
};

module.exports = {
	getAllUsers,
	getUserById,
	addUser,
	updateUser,
	deleteUser
};
