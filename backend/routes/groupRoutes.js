const express = require("express");
const router = express.Router();

const {
	createGroup,
	deleteGroup,
	editGroup,
	getGroupById,
	getAvailableGroups,
	joinGroup
} = require("../controllers/groupController");


router.get("/group/:id", getGroupById);

router.post("/create-group", (req, res) => {
	createGroup(req, res);
});

router.patch("/edit-group/:id", (req, res) => {
	editGroup(req, res);
});

router.delete("/delete-group/:id", (req, res) => {
	deleteGroup(req, res);
});

router.get("/available-groups/:id", getAvailableGroups)

router.post("/join-groups", (req, res) => {
	joinGroup(req, res);
})

module.exports = router;
