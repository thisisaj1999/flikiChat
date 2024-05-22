const fs = require("fs");
const db = require("../../config/dbConnection");
const path = require("path");

const createGroup = async (req, res) => {
	const groupData = req.body;

	if (Object.keys(groupData).length === 0) {
		console.log(`🔴  createGroup : Group's data is required for create`);
		res.json({
			status: 404,
			message: `Group's data is required for create`,
		});
		return;
	}

	const group_name = groupData?.group_name;
	const owner_id = groupData?.owner_id;
	const profile_image_url = groupData?.profile_image_url;
	const description = groupData?.description;
	const participant_ids = groupData?.participant_ids;

	const insert_groups_table = fs
		.readFileSync(
			path.join(__dirname, "../../sql/insert/insert_groups_table.sql")
		)
		.toString();

	try {

		const groupValues = [group_name, owner_id, profile_image_url, description];

		const create_newGroup = await db.query(
			insert_groups_table,
			groupValues
		);

		if (create_newGroup.rows.length > 0) {
			console.log(`🟢  createGroup : Data inserted to groups table`);
			res.json({
				status: 200,
				message: `Data inserted to groups table`,
			});
		}

	} catch (error) {
		console.log(`🔴  createGroup : Unable to create a new group`, error);
		res.json({
			status: 404,
			message: `Unable to create a new group`,
			data: error.message,
		});
	}
};

module.exports = createGroup;
