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
          console.log(`🟢 [SOCKET] : ${socket?.id} : joinGroupRoom : User left the ${"room"+oldRoomId} chat room`);
          socket.join("room"+groupId);

          // Fetch and send group details, messages, and members
          const groupDetails = await getGroupDetails({ socket, io, groupId, shouldEmit: false });
          const groupMessages = await getGroupMessages({ socket, io, groupId, offset: 0, limit: 100, shouldEmit: false });
          const groupMembers = await getGroupMembers({ socket, io, groupId, shouldEmit: false });

          const payload = {
              group: groupDetails,
              messages: groupMessages,
              members: groupMembers
          };
          console.log(`🟢 [SOCKET] : ${socket?.id} : joinGroupRoom : User entered in the ${"room"+groupId} chat room`);
          io.to(socket?.id).emit("group:join", payload);

      } else {
          await db.query("UPDATE group_memberships SET is_online = false WHERE user_id = $1", [userId]);
      }
  } catch (error) {
        console.error(`🔴 [SOCKET] : ${socket?.id} : joinGroupRoom : Error joining group room ${"room"+groupId}`, error);
  }
}

module.exports = joinGroupRoom;