const fs = require("fs");
const db = require("../../config/dbConnection");
const path = require("path");

const createNewGroup = async (socket, io, payload) => {

	if (Object.keys(payload).length === 0) {
		console.log(`🔴 [SOCKET] : ${socket?.id} : createNewGroup : Group's data is required for create`);
    io.emit("group:resCreateNewGroup", { 
      status: 404,
      message: `Group's data is required for create`
    });
		return;
	}

	const group_name = payload?.group_name;
	const owner_id = payload?.owner_id;
	const profile_image_url = payload?.profile_image_url;
	const description = payload?.description;
	const participant_ids = payload?.participant_ids;

	const insert_groups_table = fs
		.readFileSync(
			path.join(__dirname, "../../sql/insert/insert_groups_table.sql")
		)
		.toString();

	const user_groups_data = fs
		.readFileSync(
			path.join(__dirname, "../../sql/get/user_login_data.sql")
		)
		.toString();

	try {

		const groupValues = [group_name, owner_id, profile_image_url, description];

		const create_newGroup = await db.query(
			insert_groups_table,
			groupValues
		);

		if (create_newGroup.rows.length > 0) {
			const groupId = create_newGroup.rows[0].id;

			// Insert joined group IDs into the user_groups table
			await db.query(`INSERT INTO group_memberships (user_id, group_id, is_admin, is_online) VALUES ($1, $2, $3, $4)`, [owner_id, groupId, true, true]);

			for (const userId of participant_ids) {
				await db.query(`INSERT INTO group_memberships (user_id, group_id, is_admin, is_online) VALUES ($1, $2, $3, $4)`, [userId, groupId, false, false]);
			}

			const getGroupsAndMessages = await db.query(user_groups_data, [owner_id]);

			console.log(`🟢 [SOCKET] : ${socket?.id} : createNewGroup : Data inserted to groups table`);
      io.emit("group:resCreateNewGroup", { 
        status: 200,
				message: `Data inserted to groups table`,
				data: getGroupsAndMessages.rows
      });
		}

	} catch (error) {
		console.log(`🔴 [SOCKET] : ${socket?.id} : createNewGroup : Unable to create a new group`, error);
    io.emit("group:resCreateNewGroup", { 
      status: 404,
			message: `Unable to create a new group`,
			data: error.message,
    });
	}
};

module.exports = createNewGroup;
