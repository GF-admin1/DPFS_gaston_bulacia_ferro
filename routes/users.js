const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

// Ruta al formulario de registro
router.get('/register', usersController.register);

// Ruta al formulario de login
router.get('/login', usersController.login);

module.exports = router;
