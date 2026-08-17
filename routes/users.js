const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Middlewares
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerMiddleware');
const userRegisterValidation = require('../middlewares/userRegisterValidation');
const userLoginValidation = require('../middlewares/userLoginValidation');

// Rutas de registro (Solo para invitados)
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', upload.single('avatar'), userRegisterValidation, usersController.processRegister);

// Rutas de login (Solo para invitados)
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', userLoginValidation, usersController.processLogin);

// Rutas de perfil y logout (Solo para usuarios logueados)
router.get('/profile', authMiddleware, usersController.profile);
router.get('/logout', usersController.logout);
router.get('/edit/:id?', authMiddleware, usersController.edit);
router.put('/edit/:id?', upload.single('avatar'), usersController.processEdit);

module.exports = router;
