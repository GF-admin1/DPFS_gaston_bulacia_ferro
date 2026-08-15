const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const getProducts = () => JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: (req, res) => {
        const products = getProducts();
        res.render('products/products', { products });
    },
    detail: (req, res) => {
        const products = getProducts();
        const id = req.params.id;
        const product = products.find(prod => prod.id == id);
        res.render('products/productDetail', { product });
    },
    create: (req, res) => {
        res.render('products/productCreate');
    },
    store: (req, res) => {
        const products = getProducts();
        const newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            name: req.body.name,
            description: req.body.description,
            image: 'default.jpg',
            category: req.body.category,
            price: Number(req.body.price)
        };
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect('/products');
    },
    edit: (req, res) => {
        const products = getProducts();
        const id = req.params.id;
        const product = products.find(prod => prod.id == id);
        res.render('products/productEdit', { product });
    },
    update: (req, res) => {
        const products = getProducts();
        const id = req.params.id;
        
        const productIndex = products.findIndex(prod => prod.id == id);
        if (productIndex !== -1) {
            products[productIndex] = {
                id: Number(id),
                name: req.body.name,
                description: req.body.description,
                image: products[productIndex].image,
                category: req.body.category,
                price: Number(req.body.price)
            };
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        }
        res.redirect('/products');
    },
    destroy: (req, res) => {
        let products = getProducts();
        const id = req.params.id;
        products = products.filter(prod => prod.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect('/products');
    }
};

module.exports = controller;
