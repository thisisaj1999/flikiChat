const db = require('../../config/dbConnection');


const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const deleteUserData = await db.query(`DELETE FROM users WHERE id = ${userId};`)
        if(deleteUserData?.rowCount !== 0){   
            console.log(`🟢  deleteUser : User deleted successfully`)
            res.json({
                status: 200,
                message: `User deleted successfully`,
            });
        }else{
            console.log(`🔴  deleteUser : User I'd doesn't exists`);
            res.json({
                status: 404,
                message: `User I'd doesn't exists`
            });
        }
        
    } catch (error) {
        console.log(`🔴  deleteUser : Unable to delete the user`, error);
        res.json({
            status: 404,
            message: `Unable to delete the user`,
            data: error.message
        });
    }

}

module.exports = deleteUser;