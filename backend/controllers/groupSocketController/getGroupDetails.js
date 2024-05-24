const db = require("../../config/dbConnection");

const getGroupDetails = async ({ socket, io, groupId, shouldEmit = true }) => {
  try {
      const groupDetailsData = await db.query("SELECT * FROM groups WHERE id = $1", [groupId]);
      if (groupDetailsData?.rows.length > 0) {
          const group = groupDetailsData.rows[0];
          if (shouldEmit) {
            console.log(`🟢 [SOCKET] : ${socket?.id} : getGroupDetails : Group details fetched successfully`);
            io.emit("group:resDetail", { 
                status: 200,
                message: 'Group details fetched successfully',
                data: group
            });
          }
          return group;
      } else {
          console.log(`🔴 [SOCKET] : ${socket?.id} : getGroupDetails : No group found ${groupId}`);
          if (shouldEmit) {
            io.emit("group:resDetail", { 
                status: 404,
                message: 'No group found',
                data: []
            });
          }
        return null;
      }
  } catch (error) {
      console.error(`🔴 [SOCKET] : ${socket?.id} : getGroupDetails : Error fetching group for group ${groupId}`, error);
      if (shouldEmit) {
        io.emit('group:resDetail', {
            status: 500,
            message: 'Internal server error',
        });
      }
  }
};

module.exports = getGroupDetails;