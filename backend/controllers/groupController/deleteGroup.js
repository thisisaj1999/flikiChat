const db = require('../../config/dbConnection');

const deleteGroup = async (req, res) => {
    const groupId = req.params.id;

    try {
        const deleteGroupData = await db.query(`DELETE FROM groups WHERE id = ${groupId};`)
        if(deleteGroupData?.rowCount !== 0){   
            console.log(`🟢  deleteGroup : Group deleted successfully`)
            res.json({
                status: 200,
                message: `Group deleted successfully`,
            });
        }else{
            console.log(`🔴  deleteGroup : Group I'd doesn't exists`);
            res.json({
                status: 404,
                message: `Group I'd doesn't exists`
            });
        }
        
    } catch (error) {
        console.log(`🔴  deleteGroup : Unable to delete the group`, error);
        res.json({
            status: 404,
            message: `Unable to delete the group`,
            data: error.message
        });
    }

}

module.exports = deleteGroup;