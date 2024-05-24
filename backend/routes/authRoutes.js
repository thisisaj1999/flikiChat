const express = require("express");
const router = express.Router();

const {
	registerUser,
	loginUser,
	getAllGroupsForUser,
} = require("../controllers/authController");

router.get("/group-list", getAllGroupsForUser);

router.post("/login-user/", (req, res) => {
	loginUser(req, res);
});

router.post("/register-user", (req, res) => {
	registerUser(req, res);
});

module.exports = router;
