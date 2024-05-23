const db = require("../config/dbConnection");


module.exports = (io, socket) => {

    const joinGroupRoom = async (payload) => {
        const { userId, groupId } = payload;

        try {
            if (groupId) {
                await db.query("UPDATE group_memberships SET is_online = false WHERE user_id = $1 AND group_id != $2", [userId, groupId]);
                await db.query("UPDATE group_memberships SET is_online = true WHERE user_id = $1 AND group_id = $2", [userId, groupId]);
                socket.join(groupId);

                // Fetch and send group details, messages, and members
                const groupDetails = await getGroupDetails({ groupId, shouldEmit: false });
                const groupMessages = await getGroupMessages({ groupId, offset: 0, limit: 100, shouldEmit: false });
                const groupMembers = await getGroupMembers({ groupId, shouldEmit: false });
    
                const payload = {
                    group: groupDetails,
                    messages: groupMessages,
                    members: groupMembers
                };
    
                io.emit("group:join", payload);

            } else {
                await db.query("UPDATE group_memberships SET is_online = false WHERE user_id = $1", [userId]);
            }
        } catch (error) {
            console.error("Error joining group room:", error);
        }
    }

	const createGroup = (payload) => {
		console.log(payload);
	};

    const getGroupDetails = async ({ groupId, shouldEmit = true }) => {
        try {
            const groupDetailsData = await db.query("SELECT * FROM groups WHERE id = $1", [groupId]);
            if (groupDetailsData?.rows.length > 0) {
                const group = groupDetailsData.rows[0];
                if (shouldEmit) {
                    io.emit("group:detail", { group });
                }
                return group;
            } else {
                console.log(`🔴 getGroupDetails: No group found ${groupId}`);
                return null;
            }
        } catch (error) {
            console.error(`🔴 getGroupDetails: Error fetching group for group ${groupId}`, error);
            throw error;
        }
    };
    
    
    const getGroupMembers = async ({ groupId, shouldEmit = true }) => {
        try {
            const membersQuery = `
            SELECT users.* FROM users
            JOIN group_memberships ON users.id = group_memberships.user_id
            WHERE group_memberships.group_id = $1`;
            const membersData = await db.query(membersQuery, [groupId]);
            const members = membersData.rows;
            if (shouldEmit) {
                io.emit("group:members", { groupId, members });
            }
            return members;
        } catch (error) {
            console.error(`🔴 getGroupMembers: Error fetching members for group ${groupId}`, error);
            throw error;
        }
    };
    

    const getGroupMessages = async ({ groupId, offset = 0, limit = 100, shouldEmit = true }) => {
        try {
            const messagesQuery = `
            SELECT * FROM messages
            WHERE group_id = $1
            ORDER BY created_at DESC
            LIMIT $2 OFFSET $3`;
            const messagesData = await db.query(messagesQuery, [groupId, limit, offset]);
            const messages = messagesData.rows;
            if (shouldEmit) {
                io.emit("group:messages", { groupId, messages });
            }
            return messages;
        } catch (error) {
            console.error(`🔴 getGroupMessages: Error fetching messages for group ${groupId}`, error);
            throw error;
        }
    };
    

    socket.on("group:join", joinGroupRoom);
    socket.on("group:create", createGroup);
    socket.on("group:detail", getGroupDetails);
    socket.on("group:members", getGroupMembers);
    socket.on("group:messages", getGroupMessages);
};
