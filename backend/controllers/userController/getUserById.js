const db = require("../../config/dbConnection");

const getUserById = async (req, res) => {
	try {
		let userData;
		const userId = req.params.id;

		const getUserData = await db.query(
			`SELECT * FROM users WHERE id = ${userId}`
		);

		if (getUserData?.rows.length > 0) {
			userData = getUserData?.rows[0];

			console.log(`🟢  getUserById : User data fetched successfully`);
			res.json({
				status: 200,
				message: `User data fetched successfully`,
				data: userData,
			});
			
		} else {
			console.log(`🔴  getUserById : The user doesn't exixts`);
			res.json({
				status: 404,
				message: `The user doesn't exixts`,
			});
		}
	} catch (error) {
		console.log(`🔴  getUserById : Unable to fetch the data : `, error);
		res.json({
			status: 404,
			message: `Unable to fetch the data`,
			data: error.message,
		});
	}
};

module.exports = getUserById;
