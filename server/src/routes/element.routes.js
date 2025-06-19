const express = require('express');
const elementController = require('../controllers/element.controller');

const elementRoutes = express.Router();

elementRoutes.get('/', elementController.getAllElements);
elementRoutes.post('/', elementController.createElement);
elementRoutes.patch('/:id', elementController.updateElement);
elementRoutes.delete('/:id', elementController.deleteElement);

module.exports = elementRoutes;
