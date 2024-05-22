const fs = require("fs");
const db = require("../../config/dbConnection");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
      WHERE email = $1`,[email]
    )

    if (isUserExists?.rows.length > 0) {

			// Verify password
			const passwordValid = await bcrypt.compare(password, isUserExists.rows[0]?.password);

			if (!passwordValid) {
				console.log(`🔴  loginUser : Incorrect email and password combination`);
				res.json({
					status: 404,
					message: `Incorrect email and password combination`,
				});
			}

			const fetchedUserData = isUserExists?.rows[0];

			// Authenticate user with jwt
			const token = jwt.sign({ id: fetchedUserData.id }, process.env.JWT_SECRET, {
				expiresIn: process.env.JWT_REFRESH_EXPIRATION
			});

			console.log(`🟢  loginUser : User data fetched successfully`);
			res.json({
					status: 200,
					message: `User data fetched successfully`,
					data: {
							id: fetchedUserData?.id,
							name: fetchedUserData?.name,
							email: fetchedUserData?.email,
							accessToken: token
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