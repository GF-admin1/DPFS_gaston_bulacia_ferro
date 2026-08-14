const express = require('express');
const path = require('path');
const app = express();

// motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// home
app.get('/', (req, res) => {
    res.render('index');
});

// usuarios
app.get('/login', (req, res) => {
    res.render('users/login');
});

app.get('/register', (req, res) => {
    res.render('users/register');
});

// productos
app.get('/productCart', (req, res) => {
    res.render('products/productCart');
});

app.get('/productDetail', (req, res) => {
    res.render('products/productDetail');
});

app.get('/products/create', (req, res) => {
    res.render('products/productCreate');
});

app.get('/products/edit', (req, res) => {
    res.render('products/productEdit');
});

// levantar servidor
app.listen(3000, () => {
    console.log('Servidor funcionando en el puerto 3000');
});
