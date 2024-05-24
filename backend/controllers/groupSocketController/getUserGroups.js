const fs = require("fs");
const db = require("../../config/dbConnection");
const path = require("path");

const getUserGroups = async (socket, io, payload) => {
  console.log(payload)
  const userId = payload?.userId

  if (!userId) {
    console.log(`🔴 [SOCKET] : ${socket?.id} : getUserGroups : User ID is missing`);
    return io.emit('group:resGetUserGroups', {
      status: 400,
      message: 'User ID is missing',
    });
  }

  const user_groups_data = fs
    .readFileSync(
      path.join(__dirname, "../../sql/get/user_login_data.sql")
    )
    .toString();

  try {
    const allGroupsData = await db.query(user_groups_data, [userId]);

    if (allGroupsData.rows.length > 0) {
      console.log(`🟢 [SOCKET] : ${socket?.id} : getUserGroups : Groups fetched successfully`);
      io.emit('group:resGetUserGroups', {
        status: 200,
        message: 'Groups fetched successfully',
        data: {
          availableGroups: allGroupsData.rows,
        },
      });
    } else {
      console.log(`🔴 [SOCKET] : ${socket?.id} : getUserGroups : No groups found where user is present`);
      io.emit('group:resGetUserGroups', {
        status: 404,
        message: 'No groups found where user is not present',
      });
    }
  } catch (error) {
    console.log(`🔴 [SOCKET] : ${socket?.id} : getUserGroups : Error fetching groups - ${error.message}`);
    io.emit('group:resGetUserGroups', {
      status: 500,
      message: 'Internal server error',
    });
  }
};

module.exports = getUserGroups;