const express = require('express');
const usersController = require('../controllers/users.controller');

const usersRoutes = express.Router();

usersRoutes.get('/', usersController.getAllUsers);
usersRoutes.post('/', usersController.createUsers);
usersRoutes.patch('/:id', usersController.updateUser);
usersRoutes.delete('/:id', usersController.deleteUser);

module.exports = usersRoutes;
