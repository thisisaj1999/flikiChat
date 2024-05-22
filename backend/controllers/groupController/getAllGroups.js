const db = require("../../config/dbConnection");

const getAllGroups = async (req, res) => {
	const allGroupsData = await db.query("Select * from groups");

	if (allGroupsData?.rows.length > 0) {
		console.log(`🟢  getAllGroups : All groups data fetched successfully`);
		res.json({
			status: 200,
			message: `All groups data fetched successfully`,
			data: {
				group_table: allGroupsData.rows,
			},
		});
	} else {
		console.log(`🔴  getAllGroups : No group found`);
		res.json({
			status: 404,
			message: `No group found`,
		});
	}
};

module.exports = getAllGroups;
