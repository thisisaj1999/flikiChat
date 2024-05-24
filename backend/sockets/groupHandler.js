const {
	createNewGroup,
	getGroupDetails,
	getGroupMembers,
	getGroupMessages,
	joinGroupRoom,
	getAllUsersForCreateGroup,
	getAvailableGroups,
	joinNewGroup
} = require("../controllers/groupSocketController");

module.exports = (io, socket) => {
	socket.on("group:join", (payload) => joinGroupRoom(socket, io, payload));
	socket.on("group:reqCreateNewGroup", (payload) => createNewGroup(io, payload));
	socket.on("group:reqJoinNewGroup", (payload) => joinNewGroup(io, payload));
	socket.on("group:detail", (payload) => getGroupDetails(io, payload));
	socket.on("group:members", (payload) => getGroupMembers(io, payload));
	socket.on("group:messages", (payload) => getGroupMessages(io, payload));
	socket.on("group:reqAvailableUsers", (payload) => getAllUsersForCreateGroup(io, payload));
	socket.on("group:reqAvailableGroups", (payload) => getAvailableGroups(io, payload));
};
