const fs = require("fs");
const db = require("../../config/dbConnection");
const path = require("path");

const joinNewGroup = async (socket, io, payload) => {

	if (Object.keys(payload).length === 0) {
		console.log(`🔴 [SOCKET] : ${socket?.id} : joinNewGroup : Group Id's data is required for joining`);
    io.emit("group:resJoinNewGroup", { 
      status: 404,
      message: `Group Id's data is required for joining`,
    });
		return;
	}

	const joinned_group_ids = payload?.joinned_group_ids;
  const userId = payload?.userId

	const insert_group_memberships_table = fs
		.readFileSync(
			path.join(__dirname, "../../sql/insert/insert_group_memberships_table.sql")
		)
		.toString();
	
	const user_groups_data = fs
		.readFileSync(
			path.join(__dirname, "../../sql/get/user_login_data.sql")
		)
		.toString();

	try {

		// Insert joined group IDs into the user_groups table
		for (const groupId of joinned_group_ids) {
			await db.query(
				insert_group_memberships_table,
				[groupId, userId, false, true]
			);
		}

		const getGroupsAndMessages = await db.query(user_groups_data, [userId]);

		console.log(`🟢 [SOCKET] : ${socket?.id} : joinNewGroup : User added to the groups`);
    io.emit("group:resJoinNewGroup", { 
      status: 200,
			message: `User added to the groups`,
			data: getGroupsAndMessages.rows
    });
			
	} catch (error) {
		console.log(`🔴 [SOCKET] : ${socket?.id} : joinNewGroup : Unable to join a new group`, error);
    io.emit("group:resJoinNewGroup", { 
			status: 404,
			message: `Unable to join a new group`,
			data: error.message,
    });
	}
};

module.exports = joinNewGroup;
