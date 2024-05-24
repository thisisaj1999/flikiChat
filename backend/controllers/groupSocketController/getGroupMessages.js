const fs = require("fs");
const db = require("../../config/dbConnection");
const path = require("path");

const getGroupMessages = async ({ socket, io, groupId, offset = 0, limit = 100, shouldEmit = true }) => {

  const group_messages = fs
  .readFileSync(
    path.join(__dirname, "../../sql/get/group_messages.sql")
  )
  .toString();

  try {

      const messagesData = await db.query(group_messages, [groupId, limit, offset]);
      
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