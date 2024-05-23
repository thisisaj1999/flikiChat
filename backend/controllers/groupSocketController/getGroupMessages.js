const db = require("../../config/dbConnection");

const getGroupMessages = async ({ io, groupId, offset = 0, limit = 100, shouldEmit = true }) => {
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

module.exports = getGroupMessages;