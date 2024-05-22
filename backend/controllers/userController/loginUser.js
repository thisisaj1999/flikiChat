const fs = require("fs");
const db = require("../../config/dbConnection");

const loginUser = async (req, res) => {
	const userData = req.body;

	if (Object.keys(userData).length === 0) {
		console.log(`🔴  loginUser : User's data is required for login`);
		res.json({
			status: 404,
			message: `User's data is required for login`,
		});
		return;
	}

	const email = userData?.email;
	const password = userData?.password;

	try {

    const isUserExists = await db.query(
     `SELECT *
      FROM users 
      WHERE email = $1 AND password = $2`,[email, password]
    )

    if (isUserExists?.rows.length > 0) {
			const fetchedUserData = isUserExists?.rows[0];
			const userId = isUserExists.rows[0]?.id;

			const getAllGroupsQuery = await db.query(`SELECT * FROM group_memberships WHERE user_id = $1`, [userId]);
			const getAllGroups = getAllGroupsQuery.rows;

			const getGroupsDataPromises = getAllGroups.map(async (group) => {
					const groupDataQuery = await db.query(`SELECT * FROM groups WHERE id = $1`, [group?.group_id]);
					return groupDataQuery.rows[0];
			});

			// Wait for all group data queries to complete
			const getGroupsData = await Promise.all(getGroupsDataPromises);

			console.log(`🟢  loginUser : User data fetched successfully`);
			res.json({
					status: 200,
					message: `User data fetched successfully`,
					data: {
							userData: fetchedUserData,
							joinedGroups: getAllGroups,
							joinedGroupData: getGroupsData
					},
			});
			
		} else {
			console.log(`🔴  loginUser : The user doesn't exixts`);
			res.json({
				status: 404,
				message: `The user doesn't exists`,
			});
		}
	} catch (error) {
		console.log(`🔴  loginUser : Unable to login the user`, error);
		res.json({
			status: 404,
			message: `Unable to login the user`,
			data: error.message,
		});
	}

};

module.exports = loginUser;