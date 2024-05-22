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
        }
      } catch (error) {
        console.error(`🔴 message:created : Error inserting message`, error);
      }
    } else {
      console.log(`🔴 message:created : No message provided`);
    }
  };

  const readMessage = (orderId, callback) => {
    console.log(orderId, callback);
  };

  return { createMessage, readMessage };
};