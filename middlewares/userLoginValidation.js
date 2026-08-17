const { body } = require('express-validator');

const userLoginValidation = [
    body('email')
        .notEmpty().withMessage('Debes ingresar tu correo electrónico').bail()
        .isEmail().withMessage('Debes ingresar un formato de correo válido'),
    
    body('password')
        .notEmpty().withMessage('Debes ingresar tu contraseña')
];

module.exports = userLoginValidation;