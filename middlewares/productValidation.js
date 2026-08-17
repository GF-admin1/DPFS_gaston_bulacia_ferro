const path = require('path');
const { body } = require('express-validator');

const productValidation = [
    body('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    
    body('description')
        .notEmpty().withMessage('La descripción es obligatoria').bail()
        .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
    
    body('image').custom((value, { req }) => {
        const file = req.file;
        const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        
        // Si no se subió archivo en creación/edición, se permite o maneja según tu lógica
        if (!file) {
            return true;
        }
        
        const fileExtension = path.extname(file.originalname).toLowerCase();
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`);
        }
        
        return true;
    })
];

module.exports = productValidation;