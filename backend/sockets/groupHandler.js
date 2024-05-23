const db = require("../config/dbConnection");


module.exports = (io, socket) => {

    const joinGroupRoom = (payload) => {
        console.log(payload)
        socket.join(payload?.groupId)
    }

	const createGroup = (payload) => {
		console.log(payload);
	};

	const getGroupDetails = async (groupDetails) => {
    const groupId = groupDetails?.groupId;

    try {
        const groupDetailsData = await db.query("SELECT * FROM groups WHERE id = $1", [groupId]);
        if (groupDetailsData?.rows.length > 0) {
            console.log(`🟢 groupDetails: All group data fetched successfully`);
            io.emit("group:detail", payload);
        } else {
            console.log(`🔴 groupDetails: No group found ${groupId}`);
        }
    } catch (error) {
        console.error(`🔴 groupDetails: Error fetching group for group ${groupId}`, error);
    }
	};

    socket.on("group:join", joinGroupRoom);
    socket.on("group:create", createGroup);
    socket.on("group:read", getGroupDetails);
};
