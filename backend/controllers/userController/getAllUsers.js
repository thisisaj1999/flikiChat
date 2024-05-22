const db = require("../../config/dbConnection");

const getAllUsers = async (req, res) => {
	const userId = req.params.id;

	let query;
	let params = [];

	if (userId) {
		query = "SELECT * FROM users WHERE id != $1";
		params = [userId];
	} else {
		query = "SELECT * FROM users";
	}

	const allUsersData = await db.query(query, params);

	if (allUsersData?.rows.length > 0) {
		console.log(`🟢  getAllUsers : All users data fetched successfully`);
		res.json({
			status: 200,
			message: `All users data fetched successfully`,
			data: {
				user_table: allUsersData.rows,
			},
		});
	} else {
		console.log(`🔴  getAllUsers : No user found`);
		res.json({
			status: 404,
			message: `No user found`,
		});
	}
};

module.exports = getAllUsers;
