const express = require('express');
const router = express.Router();
const productsApiController = require('../../controllers/api/productsApiController');

// Endpoint: Listado de productos
router.get('/', productsApiController.list);

// Endpoint: Detalle de un producto
router.get('/:id', productsApiController.detail);

module.exports = router;