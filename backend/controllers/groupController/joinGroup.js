const fs = require("fs");
const db = require("../../config/dbConnection");
const path = require("path");

const joinGroup = async (req, res) => {
	const joinGroupData = req.body;

	if (Object.keys(joinGroupData).length === 0) {
		console.log(`🔴  joinGroup : Group Id's data is required for joining`);
		res.json({
			status: 404,
			message: `Group Id's data is required for joining`,
		});
		return;
	}

	const joinned_group_ids = joinGroupData?.joinned_group_ids;
  const userId = joinGroupData?.userId

	const insert_group_memberships_table = fs
		.readFileSync(
			path.join(__dirname, "../../sql/insert/insert_group_memberships_table.sql")
		)
		.toString();

	try {

		// Insert joined group IDs into the user_groups table
		for (const groupId of joinned_group_ids) {
			await db.query(
				insert_group_memberships_table,
				[groupId, userId, false]
			);
		}

		console.log(`🟢  joinGroup : User added to the groups`);
		res.json({
			status: 200,
			message: `User added to the groups`,
		});
			
	} catch (error) {
		console.log(`🔴  joinGroup : Unable to join a new group`, error);
		res.json({
			status: 404,
			message: `Unable to join a new group`,
			data: error.message,
		});
	}

};

module.exports = joinGroup;
