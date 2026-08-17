const express = require('express');
const router = express.Router();

// Requerir el controlador de productos
const productsController = require('../controllers/productsController');
const productValidation = require('../middlewares/productValidation');

// Listado de productos
router.get('/', productsController.index);

// Formulario de creación de producto
router.get('/create', productsController.create);

// Detalle de un producto particular
router.get('/:id', productsController.detail);

// Acción de creación (POST)
router.post('/', productValidation, productsController.store);

// Formulario de edición de un producto
router.get('/:id/edit', productsController.edit);

// Acción de edición (PUT)
router.put('/:id', productValidation, productsController.update);

// Acción de borrado (DELETE)
router.delete('/:id', productsController.destroy);

module.exports = router;
