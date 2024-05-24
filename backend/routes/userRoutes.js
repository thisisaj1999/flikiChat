const express = require("express");
const router = express.Router();

const {
	deleteUser,
	editUser,
	getAllUsers,
} = require("../controllers/userController");


router.get("/users-list/:id?", (req, res) => {
	getAllUsers(req, res);
}); //id is optional

router.patch("/edit-user/:id", (req, res) => {
	editUser(req, res);
});

router.delete("/delete-user/:id", (req, res) => {
	deleteUser(req, res);
});

module.exports = router;
