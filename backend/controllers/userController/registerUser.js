const fs = require("fs");
const db = require("../../config/dbConnection");
const path = require("path");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const registerUser = async (req, res) => {
	const userData = req.body;

	if (!userData || Object.keys(userData).length === 0) {
		console.log(`🔴  registerUser : User's data is required for create`);
		res.json({
			status: 404,
			message: `User's data is required for create`,
		});
		return;
	}

	const { name, email, password, joinned_group_ids } = userData;

	const hashedPassword = await bcrypt.hash(password, 10);


	const insert_users_table = fs.readFileSync(
		path.join(__dirname, "../../sql/insert/insert_users_table.sql")
	).toString();

	const user_login_data = fs.readFileSync(
		path.join(__dirname, "../../sql/get/user_login_data.sql")
	).toString();

	try {
		const isUserExists = await db.query(
			`SELECT email FROM users WHERE email = $1`,
			[email]
		);

		if (isUserExists?.rowCount === 0) {

			const userValues = [name, email, hashedPassword];

			const create_newUser = await db.query(insert_users_table, userValues);

			if (create_newUser.rows.length > 0) {
				const userId = create_newUser.rows[0].id;

				// Insert joined group IDs into the user_groups table
				for (const groupId of joinned_group_ids) {
					await db.query(`INSERT INTO group_memberships (user_id, group_id, is_admin) VALUES ($1, $2, $3)`, [userId, groupId, false]);
				}

				// Authenticate user with jwt
				const getGroupsAndMessages = await db.query(user_login_data, [userId]);

				const token = jwt.sign({
					id: userId,
					name: name,
					email: email,
					groups: getGroupsAndMessages.rows
				}, 
				process.env.JWT_SECRET, 
				{
					expiresIn: process.env.JWT_REFRESH_EXPIRATION
				})
	
				console.log(`🟢  registerUser : Data inserted to users table`);
				res.json({
					status: 200,
					message: `Data inserted to users table`,
					data: {
						accessToken: token,
					}
				});
			}
		} else {
			console.log(`🔴  registerUser : This email is already in use`);
			res.json({
				status: 404,
				message: `This email is already in use`,
			});
		}
	} catch (error) {
		console.log(`🔴  registerUser : Unable to create a new user`, error);
		res.json({
			status: 404,
			message: `Unable to create a new user`,
			data: error.message,
		});
	}

};

module.exports = registerUser;
