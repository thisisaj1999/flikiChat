const db = require("../config/dbConnection");
const path = require("path");
const fs = require("fs");

const insert_messages_table = fs
  .readFileSync(path.join(__dirname, "../sql/insert/insert_messages_table.sql"))
  .toString();

module.exports = (io) => {
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
          io.emit("message:new", payload);
        }
      } catch (error) {
        console.error(`🔴 message:created : Error inserting message`, error);
      }
    } else {
      console.log(`🔴 message:created : No message provided`);
    }
  };

  const readMessage = async (groupId, callback) => {
    try {
      const allMessages = await db.query("SELECT * FROM messages WHERE group_id = $1", [groupId]);
      if (allMessages?.rows.length > 0) {
        console.log(`🟢 readMessage: All message data fetched successfully for group ${groupId}`);
        callback({
          status: 200,
          message: "All message data fetched successfully",
          data: {
            all_messages: allMessages.rows,
          },
        });
      } else {
        console.log(`🔴 readMessage: No message found for group ${groupId}`);
        callback({
          status: 404,
          message: "No message found",
        });
      }
    } catch (error) {
      console.error(`🔴 readMessage: Error fetching messages for group ${groupId}`, error);
      callback({
        status: 500,
        message: "Error fetching messages",
      });
    }
  };

  return { createMessage, readMessage };
};