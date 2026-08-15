const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Rutas de registro
router.get('/register', usersController.register);
router.post('/register', usersController.processRegister);

// Rutas de login
router.get('/login', usersController.login);
router.post('/login', usersController.processLogin);

// Rutas de perfil y logout
router.get('/profile', usersController.profile);
router.get('/logout', usersController.logout);

module.exports = router;
