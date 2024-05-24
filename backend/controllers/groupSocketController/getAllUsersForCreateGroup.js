const db = require("../../config/dbConnection");

const getAllUsersForCreateGroup = async (io, payload) => {
    const userId = payload?.userId
  try {
      const availableUsersData = await db.query("SELECT * FROM users WHERE id != $1", [userId]);
      if (availableUsersData?.rows.length > 0) {
          const availableUsers = availableUsersData.rows;
          io.emit("group:resAvailableUsers", { 
            status: 200,
            message: 'Users list fetched successfully',
            data: availableUsers
          });
      } else {
          console.log(`🔴 getAllUsersForCreateGroup: No user found ${userId}`);
          io.emit('group:resAvailableUsers', { 
            status: 404,
            message: 'No user left to create group',
            data: [] 
        });
      }
  } catch (error) {
      console.error(`🔴 getAllUsersForCreateGroup: Error fetching users for create group ${userId}`, error);
      io.emit('group:resAvailableUsers', {
        status: 500,
        message: 'Internal server error',
      });
      
  }
};

module.exports = getAllUsersForCreateGroup;