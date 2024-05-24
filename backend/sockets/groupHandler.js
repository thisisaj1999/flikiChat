const {
	createGroup,
	getGroupDetails,
	getGroupMembers,
	getGroupMessages,
	joinGroupRoom,
	getAllUsersForCreateGroup
} = require("../controllers/groupSocketController");

module.exports = (io, socket) => {
	socket.on("group:join", (payload) => joinGroupRoom(socket, io, payload));
	socket.on("group:create", (payload) => createGroup(io, payload));
	socket.on("group:detail", (payload) => getGroupDetails(io, payload));
	socket.on("group:members", (payload) => getGroupMembers(io, payload));
	socket.on("group:messages", (payload) => getGroupMessages(io, payload));
	socket.on("group:reqAvailableUsers", (payload) => getAllUsersForCreateGroup(io, payload));
};
