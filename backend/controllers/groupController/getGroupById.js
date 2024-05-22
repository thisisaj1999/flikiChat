const db = require("../../config/dbConnection");

const getGroupById = async (req, res) => {
	try {
		let groupData;
		const groupId = req.params.id;

		const getGroupData = await db.query(
			`SELECT * FROM groups WHERE id = ${groupId}`
		);

		if (getGroupData?.rows.length > 0) {
			groupData = getGroupData?.rows[0];

			console.log(`🟢  getGroupById : Group data fetched successfully`);
			res.json({
				status: 200,
				message: `Group data fetched successfully`,
				data: groupData,
			});
			
		} else {
			console.log(`🔴  getGroupById : The group doesn't exixts`);
			res.json({
				status: 404,
				message: `The group doesn't exixts`,
			});
		}
	} catch (error) {
		console.log(`🔴  getGroupById : Unable to fetch the data : `, error);
		res.json({
			status: 404,
			message: `Unable to fetch the data`,
			data: error.message,
		});
	}
};

module.exports = getGroupById;
