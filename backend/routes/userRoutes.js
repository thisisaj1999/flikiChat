const express = require('express');
const router = express.Router();

const { registerUser, deleteUser, editUser, loginUser, getAllUsers } = require('../controllers/userController');

router.get('/users-list/:id?', (req, res) => {
    getAllUsers(req, res)
}) //id is optional

router.post('/login-user/', (req, res) => {
    loginUser(req, res)
})

router.post('/register-user', (req, res) => {
    registerUser(req, res);
});

router.patch('/edit-user/:id', (req, res) => {
    editUser(req, res);
})

router.delete('/delete-user/:id', (req, res) => {
    deleteUser(req, res);
}) 


module.exports = router;
