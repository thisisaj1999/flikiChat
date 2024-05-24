const {
	createNewGroup,
	getGroupDetails,
	getGroupMembers,
	getGroupMessages,
	joinGroupRoom,
	getAllUsersForCreateGroup,
	getAvailableGroups,
	joinNewGroup,
	getUserGroups
} = require("../controllers/groupSocketController");

module.exports = (io, socket) => {
	socket.on("group:join", (payload) => joinGroupRoom(socket, io, payload));
	socket.on("group:reqCreateNewGroup", (payload) => createNewGroup(socket, io, payload));
	socket.on("group:reqJoinNewGroup", (payload) => joinNewGroup(socket, io, payload));
	socket.on("group:detail", (payload) => getGroupDetails(socket, io, payload));
	socket.on("group:members", (payload) => getGroupMembers(socket, io, payload));
	socket.on("group:messages", (payload) => getGroupMessages(socket, io, payload));
	socket.on("group:reqAvailableUsers", (payload) => getAllUsersForCreateGroup(socket, io, payload));
	socket.on("group:reqAvailableGroups", (payload) => getAvailableGroups(socket, io, payload));
	socket.on("group:reqGetUserGroups", (payload) => getUserGroups(socket, io, payload));
};
