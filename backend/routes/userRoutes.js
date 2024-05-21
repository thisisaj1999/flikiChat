const express = require('express');
const router = express.Router();

const { createUser, deleteUser, editUser, getUserById, getAllUsers } = require('../controllers/userController');

router.get('/users-list', getAllUsers)

router.get('/user/:id', getUserById)

router.post('/add-user', (req, res) => {
    createUser(req, res);
});

router.patch('/edit-user/:id', (req, res) => {
    editUser(req, res);
})

router.delete('/delete-user/:id', (req, res) => {
    deleteUser(req, res);
}) 


module.exports = router;
