const db = require("../../config/dbConnection");

const getGroupDetails = require("./getGroupDetails");
const getGroupMessages = require("./getGroupMessages");
const getGroupMembers = require("./getGroupMembers")

const joinGroupRoom = async (socket, io, payload) => {
  const { userId, groupId, oldRoomId } = payload;

  try {
      if (groupId) {
          await db.query("UPDATE group_memberships SET is_online = false WHERE user_id = $1 AND group_id != $2", [userId, groupId]);
          await db.query("UPDATE group_memberships SET is_online = true WHERE user_id = $1 AND group_id = $2", [userId, groupId]);

          socket.leave("room"+oldRoomId)
          socket.join("room"+groupId);

          // Fetch and send group details, messages, and members
          const groupDetails = await getGroupDetails({ groupId, shouldEmit: false });
          const groupMessages = await getGroupMessages({ groupId, offset: 0, limit: 100, shouldEmit: false });
          const groupMembers = await getGroupMembers({ groupId, shouldEmit: false });

          const payload = {
              group: groupDetails,
              messages: groupMessages,
              members: groupMembers
          };

          io.to(socket?.id).emit("group:join", payload);

      } else {
          await db.query("UPDATE group_memberships SET is_online = false WHERE user_id = $1", [userId]);
      }
  } catch (error) {
      console.error("Error joining group room:", error);
  }
}

module.exports = joinGroupRoom;