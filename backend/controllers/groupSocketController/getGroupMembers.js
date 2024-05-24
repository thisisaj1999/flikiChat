const db = require("../../config/dbConnection");

const getGroupMembers = async ({ socket, io, groupId, shouldEmit = true }) => {
  try {
      const membersQuery = `
      SELECT users.* FROM users
      JOIN group_memberships ON users.id = group_memberships.user_id
      WHERE group_memberships.group_id = $1`;
      const membersData = await db.query(membersQuery, [groupId]);
      const members = membersData.rows;
      if (shouldEmit) {
        console.log(`🟢 [SOCKET] : ${socket?.id} : getGroupMembers : Group members fetched successfully`);
        io.emit("group:resMembers", { 
            status: 200,
            message: 'Group members fetched successfully',
            data: {groupId, members}
        });
      }
      return members;
  } catch (error) {
      console.error(`🔴 [SOCKET] : ${socket?.id} : getGroupMembers : Error fetching members for group ${groupId}`, error);
      if (shouldEmit) {
        io.emit('group:resMembers', {
            status: 500,
            message: 'Internal server error',
        });
      }
      
  }
};


module.exports = getGroupMembers;