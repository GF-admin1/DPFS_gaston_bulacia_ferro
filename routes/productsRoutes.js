const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Listado de productos');
});

router.get('/create', (req, res) => {
    res.render('products/productCreate');
});

router.get('/:id', (req, res) => {
    res.send('Detalle del producto ID: ' + req.params.id);
});

router.get('/:id/edit', (req, res) => {
    res.render('products/productEdit');
});

module.exports = router;
