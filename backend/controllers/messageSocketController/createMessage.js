const db = require("../../config/dbConnection");
const path = require("path");
const fs = require("fs");

const insert_messages_table = fs
  .readFileSync(path.join(__dirname, "../../sql/insert/insert_messages_table.sql"))
  .toString();

const createMessage = async (socket, io, payload) => {

  if (payload?.message) {
    const messagePayload = [
      payload.message,
      payload.sender_id,
      payload.group_id,
    ];
    try {
      const isMessagePushed = await db.query(insert_messages_table, messagePayload);
      if (isMessagePushed?.rows.length > 0) {
        console.log(`🟢 [SOCKET] : ${socket?.id} : message:created : New message inserted`);
        io.to("room"+payload?.group_id).emit("message:new", isMessagePushed.rows);
      }
    } catch (error) {
      console.error(`🔴 [SOCKET] : ${socket?.id} : message:created : Error inserting message`, error);
    }
  } else {
    console.log(`🔴 [SOCKET] : ${socket?.id} : message:created : No message provided`);
  }
};

module.exports = createMessage;