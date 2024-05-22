const express = require("express");
const router = express.Router();

const {
	createGroup,
	deleteGroup,
	editGroup,
	getGroupById,
	getAllGroups,
} = require("../controllers/groupController");

router.get("/group-list", getAllGroups);

router.get("/group/:id", getGroupById);

router.post("/add-group", (req, res) => {
	createGroup(req, res);
});

router.patch("/edit-group/:id", (req, res) => {
	editGroup(req, res);
});

router.delete("/delete-group/:id", (req, res) => {
	deleteGroup(req, res);
});

module.exports = router;
