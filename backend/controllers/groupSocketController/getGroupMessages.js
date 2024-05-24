const db = require("../../config/dbConnection");

const getGroupMessages = async ({ socket, io, groupId, offset = 0, limit = 100, shouldEmit = true }) => {
  try {
      const messagesQuery = `
      SELECT * FROM messages
      WHERE group_id = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3`;
      const messagesData = await db.query(messagesQuery, [groupId, limit, offset]);
      const messages = messagesData.rows;
      if (shouldEmit) {
          console.log(`🟢 [SOCKET] : ${socket?.id} : getGroupMessages : Group messages fetched successfully`);
          io.emit("group:resMessages", {
            status: 200,
            message: 'Group messages fetched successfully',
            data: {groupId, messages}
          });
      }
      return messages;
  } catch (error) {
      console.error(`🔴 [SOCKET] : ${socket?.id} : getGroupMessages : Error fetching messages for group ${groupId}`, error);
      if (shouldEmit) {
        io.emit('group:resMessages', {
            status: 500,
            message: 'Internal server error',
        });
      }
  }
};

module.exports = getGroupMessages;