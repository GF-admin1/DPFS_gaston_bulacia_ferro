const path = require('path');
const { body } = require('express-validator');
const db = require('../database/models');

const userRegisterValidation = [
    body('first_name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    
    body('last_name')
        .notEmpty().withMessage('El apellido es obligatorio').bail()
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    
    body('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debes ingresar un formato de correo válido').bail()
        .custom(async (value) => {
            const user = await db.User.findOne({ where: { email: value } });
            if (user) {
                throw new Error('El correo electrónico ya está registrado');
            }
            return true;
        }),
    
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    
    body('profile_image').custom((value, { req }) => {
        const file = req.file;
        const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        
        if (!file) {
            return true; // Opcional si permites registro sin foto, o lanza Error si es obligatoria
        }
        
        const fileExtension = path.extname(file.originalname).toLowerCase();
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
        }
        
        return true;
    })
];

module.exports = userRegisterValidation;