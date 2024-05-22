const db = require("../../config/dbConnection");
const fs = require("fs");
const path = require("path");

const editGroup = async (req, res) => {
	const groupData = req.body;

	if (Object.keys(groupData).length === 0) {
		console.log(`🔴  editGroup : Group's data is required for update`);
		res.json({
			status: 404,
			message: `Group's data is required for update`,
		});
		return;
	}

	const groupId = req.params.id;
	if (!groupId) {
		console.log(`🔴  editGroup : Unable to find the groupId in params`);
		res.json({
			status: 404,
			message: `Unable to find the groupId in params`,
		});
		return;
	}

	const group_name = groupData?.group_name;
	const owner_id = groupData?.owner_id;
	const profile_image_url = groupData?.profile_image_url;
	const description = groupData?.description;
	const participant_ids = groupData?.participant_ids;
	const group_id = groupData?.group_id;

	const newGroupData = [group_name, owner_id, profile_image_url, description, participant_ids, group_id];

	const update_group_dataQuery = fs
		.readFileSync(
			path.join(__dirname, "../../sql/update/update_groups_table.sql")
		)
		.toString();

	try {
		const isGroupIdExists = await db.query(
			`SELECT id FROM groups WHERE id = $1`,
			[group_id]
		);

		if (isGroupIdExists.rowCount === 0) {
			console.log(`🔴  editGroup : Group not found`);
			res.json({
				status: 404,
				message: `Group not found`,
			});
			return;
		}

		const updateData = await db.query(update_group_dataQuery, newGroupData);

		if (updateData?.rowCount !== 0) {
			console.log(`🟢  editGroup : Group data updated successfully`);
			res.json({
				status: 200,
				message: `Group data updated successfully`,
			});
		}
	} catch (error) {
		console.log(`🔴  editGroup : Unable to update the data : `, error);
		res.json({
			status: 404,
			message: `Unable to update the data`,
			data: error.message,
		});
	}
};

module.exports = editGroup;
