const express = require('express');
const router = express.Router();

// 1. Requerir el controlador y el middleware de multer
const usersController = require('../controllers/usersController');
const upload = require('../middlewares/multerMiddleware');

// Ruta al formulario de registro (GET)
router.get('/register', usersController.register);

// Ruta para procesar el registro con Multer para la foto de perfil (POST)
router.post('/register', upload.single('avatar'), usersController.processRegister);

// Ruta al formulario de login (GET)
router.get('/login', usersController.login);

module.exports = router;
