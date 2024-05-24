const db = require("../../config/dbConnection");

const getGroupsUserNotIn = async (io, payload) => {

  const userId = payload?.userId

  if (!userId) {
    console.log(`🔴 getGroupsUserNotIn : User ID is missing`);
    return io.emit('group:resAvailableGroups', {
      status: 400,
      message: 'User ID is missing',
    });
  }

  try {
    const allGroupsData = await db.query(`
      SELECT g.*
      FROM groups g
      LEFT JOIN group_memberships gm ON g.id = gm.group_id AND gm.user_id = $1
      WHERE gm.user_id IS NULL
    `, [userId]);

    if (allGroupsData.rows.length > 0) {
      console.log(`🟢 getGroupsUserNotIn : Groups where user is not present fetched successfully`);
      io.emit('group:resAvailableGroups', {
        status: 200,
        message: 'Groups where user is not present fetched successfully',
        data: {
          group_table: allGroupsData.rows,
        },
      });
    } else {
      console.log(`🔴 getGroupsUserNotIn : No groups found where user is not present`);
      io.emit('group:resAvailableGroups', {
        status: 404,
        message: 'No groups found where user is not present',
      });
    }
  } catch (error) {
    console.log(`🔴 getGroupsUserNotIn : Error fetching groups - ${error.message}`);
    io.emit('group:resAvailableGroups', {
      status: 500,
      message: 'Internal server error',
    });
  }
};

module.exports = getGroupsUserNotIn;