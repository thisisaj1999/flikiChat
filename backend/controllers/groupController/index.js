const createGroup = require("./createGroup");
const deleteGroup = require("./deleteGroup");
const editGroup = require("./editGroup");
const getGroupById = require("./getGroupById");
// const getAllGroups = require('./getAllGroups')
const getAvailableGroups = require("./getAvailableGroups");
const joinGroup = require("./joinGroup");

module.exports = {
	createGroup,
	deleteGroup,
	editGroup,
	getGroupById,
	// getAllGroups,
	getAvailableGroups,
	joinGroup,
};
