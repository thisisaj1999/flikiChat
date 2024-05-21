const db = require("../../config/dbConnection");
const fs = require("fs");
const path = require("path");

const editUser = async (req, res) => {
	const userData = req.body;

	if (Object.keys(userData).length === 0) {
		console.log(`🔴  editUser : User's data is required for update`);
		res.json({
			status: 404,
			message: `User's data is required for update`,
		});
		return;
	}

	const userId = req.params.id;
	if (!userId) {
		console.log(`🔴  editUser : Unable to find the userId in params`);
		res.json({
			status: 404,
			message: `Unable to find the userId in params`,
		});
		return;
	}

	const name = userData?.name;
	const email = userData?.email;
	const password = userData?.password;
	const joinned_group_ids = userData?.joinned_group_ids;

	const newUserData = [name, email, password, joinned_group_ids];

	const update_user_dataQuery = fs
		.readFileSync(
			path.join(__dirname, "../../sql/update/update_users_table.sql")
		)
		.toString();

	try {
		const isUserIdExists = await db.query(
			`SELECT id FROM users WHERE id = $1`,
			[userId]
		);

		if (isUserIdExists.rowCount === 0) {
			console.log(`🔴  editUser : User not found`);
			res.json({
				status: 404,
				message: `User not found`,
			});
			return;
		}

		const updateData = await db.query(update_user_dataQuery, newUserData);

		if (updateData?.rowCount !== 0) {
			console.log(`🟢  editUser : User data updated successfully`);
			res.json({
				status: 200,
				message: `User data updated successfully`,
			});
		}
	} catch (error) {
		console.log(`🔴  editUser : Unable to update the data : `, error);
		res.json({
			status: 404,
			message: `Unable to update the data`,
			data: error.message,
		});
	}
};

module.exports = editUser;
