const fs = require("fs");
const db = require("../../config/dbConnection");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require("path");

const loginUser = async (req, res) => {
	const userData = req.body;

	if (Object.keys(userData).length === 0) {
		console.log(`🔴 [POST] : loginUser : User's data is required for login`);
		res.json({
			status: 404,
			message: `User's data is required for login`,
		});
		return;
	}

	const email = userData?.email;
	const password = userData?.password;

	const user_login_data = fs
	.readFileSync(
		path.join(__dirname, "../../sql/get/user_login_data.sql")
	)
	.toString();

	try {

    const isUserExists = await db.query(
     `SELECT *
      FROM users 
      WHERE email = $1`,[email]
    )

    if (isUserExists?.rows.length > 0) {

			// Verify password
			const passwordValid = await bcrypt.compare(password, isUserExists.rows[0]?.password);

			if (!passwordValid) {
				console.log(`🔴 [POST] : loginUser : Incorrect email and password combination`);
				res.json({
					status: 404,
					message: `Incorrect email and password combination`,
				});
				return;
			}

			const fetchedUserData = isUserExists?.rows[0];

			const getGroupsAndMessages = await db.query(user_login_data, [fetchedUserData.id]);

			const token = jwt.sign({
				id: fetchedUserData.id,
				name: fetchedUserData.name,
				email: fetchedUserData.email
			}, 
			process.env.JWT_SECRET, 
			{
				expiresIn: process.env.JWT_REFRESH_EXPIRATION
			})



			console.log(`🟢 [POST] : loginUser : User data fetched successfully`);
			res.json({
					status: 200,
					message: `User data fetched successfully`,
					data: {
							accessToken: token,
							groups: getGroupsAndMessages.rows
					},
			});
			
		} else {
			console.log(`🔴 [POST] : loginUser : The user doesn't exixts`);
			res.json({
				status: 404,
				message: `The user doesn't exists`,
			});
		}
	} catch (error) {
		console.log(`🔴 [POST] : loginUser : Unable to login the user`, error);
		res.json({
			status: 404,
			message: `Unable to login the user`,
			data: error.message,
		});
	}

};

module.exports = loginUser;