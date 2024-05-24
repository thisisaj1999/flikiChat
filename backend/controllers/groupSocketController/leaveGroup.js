const fs = require("fs");
const db = require("../../config/dbConnection");
const path = require("path");

const leaveGroup = async (socket, io, payload) => {
  const { userId, groupId } = payload;

  if (Object.keys(payload).length === 0) {
    console.log(`🔴 [SOCKET] : ${socket?.id} : leaveGroup : Group and User Id's data is required for leaving the group`);
    io.emit("group:resLeaveGroup", {
      status: 404,
      message: `Group and User Id's data is required for leave the group`,
    });
    return;
  }

	const user_groups_data = fs
		.readFileSync(
			path.join(__dirname, "../../sql/get/user_login_data.sql")
		)
		.toString();

  try {
    if (groupId) {

      socket.leave("room" + groupId);

      const userDetails = await db.query("SELECT * FROM group_memberships WHERE user_id = $1 AND group_id = $2", [userId, groupId]);

      if (userDetails.rows.length > 0) {

        // Remove the user from the group_memberships table
        await db.query("DELETE FROM group_memberships WHERE user_id = $1 AND group_id = $2", [userId, groupId]);

        // Check if the leaving user was an admin
        if (userDetails.rows[0].is_admin) {

          const nextAdmin = await db.query(
            "SELECT user_id FROM group_memberships WHERE group_id = $1 ORDER BY joined_at LIMIT 1",
            [groupId]
          );

          if (nextAdmin.rows.length > 0) {
            // Update the next user as admin
            await db.query("UPDATE group_memberships SET is_admin = true WHERE user_id = $1 AND group_id = $2", [nextAdmin.rows[0].user_id, groupId]);
          }
        }
      }

      console.log(`🟢 [SOCKET] : ${socket?.id} : leaveGroup : User left the group`);

      const getGroupsAndMessages = await db.query(user_groups_data, [userId]);

      io.to(socket?.id).emit("group:resLeaveGroup", { 
        status: 200,
        message: `User left the group`,
        data: getGroupsAndMessages.rows
      });
      
    } else {
      await db.query("UPDATE group_memberships SET is_online = false WHERE user_id = $1", [userId]);
    }
  } catch (error) {
    console.error(`🔴 [SOCKET] : ${socket?.id} : leaveGroup : Error leaving group`, error);
    io.emit("group:resLeaveGroup", {
      status: 500,
      message: `Error leaving group room: ${error.message}`,
    });
  }
};

module.exports = leaveGroup;
