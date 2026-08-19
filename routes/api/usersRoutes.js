const express = require('express');
const router = express.Router();
const usersApiController = require('../../controllers/api/usersApiController');

// Endpoint: Listado de usuarios
router.get('/', usersApiController.list);

// Endpoint: Detalle de un usuario
router.get('/:id', usersApiController.detail);

module.exports = router;