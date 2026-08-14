const express = require('express');
const path = require('path');
const app = express();

// Rutas
const productsRoutes = require('./routes/productsRoutes');

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usar las rutas de productos
app.use('/products', productsRoutes);

// Ruta principal (Home)
app.get('/', (req, res) => {
    res.render('index');
});

// Otras rutas vistas
app.get('/login', (req, res) => {
    res.render('users/login');
});

app.get('/register', (req, res) => {
    res.render('users/register');
});

app.get('/productCart', (req, res) => {
    res.render('products/productCart');
});

app.get('/productDetail', (req, res) => {
    res.render('products/productDetail');
});

// Servidor escuchando en puerto 3000
app.listen(3000, () => {
    console.log('Servidor funcionando en el puerto 3000');
});
