const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: (req, res) => {
        res.render('products/products', { products });
    },
    detail: (req, res) => {
        const id = req.params.id;
        const product = products.find(prod => prod.id == id);
        res.render('products/productDetail', { product });
    },
    create: (req, res) => {
        res.render('products/productCreate');
    },
    store: (req, res) => {
        // Lógica de creación pendiente
        res.redirect('/products');
    },
    edit: (req, res) => {
        const id = req.params.id;
        const product = products.find(prod => prod.id == id);
        res.render('products/productEdit', { product });
    },
    update: (req, res) => {
        // Lógica de edición pendiente
        res.redirect('/products');
    },
    destroy: (req, res) => {
        // Lógica de eliminación pendiente
        res.redirect('/products');
    }
};

module.exports = controller;
