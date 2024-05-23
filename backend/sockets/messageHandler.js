const db = require("../config/dbConnection");
const path = require("path");
const fs = require("fs");

const insert_messages_table = fs
  .readFileSync(path.join(__dirname, "../sql/insert/insert_messages_table.sql"))
  .toString();

module.exports = (io, socket) => {
  const createMessage = async (payload) => {
    if (payload?.message) {
      const messagePayload = [
        payload.message,
        payload.sender_id,
        payload.group_id,
      ];
      try {
        const isMessagePushed = await db.query(insert_messages_table, messagePayload);
        if (isMessagePushed?.rows.length > 0) {
          console.log(`🟢 message:created : New message inserted`);

          // Get the list of online users in the group
          // const onlineUsers = await db.query(
          //   `SELECT user_id FROM group_memberships WHERE group_id = $1 AND is_online = true`,
          //   [payload.group_id]
          // );

          io.emit("message:new", isMessagePushed.rows);
          // Emit the new message to only the online users
          // onlineUsers.rows.forEach((user) => {
          //   io.to(user.user_id).emit("message:new", isMessagePushed.rows);
          // });

        }
      } catch (error) {
        console.error(`🔴 message:created : Error inserting message`, error);
      }
    } else {
      console.log(`🔴 message:created : No message provided`);
    }
  };


  socket.on("message:create", createMessage);
};