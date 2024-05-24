const db = require("../../config/dbConnection");

const getGroupDetails = async ({ io, groupId, shouldEmit = true }) => {
  try {
      const groupDetailsData = await db.query("SELECT * FROM groups WHERE id = $1", [groupId]);
      if (groupDetailsData?.rows.length > 0) {
          const group = groupDetailsData.rows[0];
          if (shouldEmit) {
            io.emit("group:resDetail", { 
                status: 200,
                message: 'group details fetched successfully',
                data: group
            });
          }
          return group;
      } else {
          console.log(`🔴 getGroupDetails: No group found ${groupId}`);
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
      console.error(`🔴 getGroupDetails: Error fetching group for group ${groupId}`, error);
      if (shouldEmit) {
        io.emit('group:resDetail', {
            status: 500,
            message: 'Internal server error',
        });
      }
  }
};

module.exports = getGroupDetails;