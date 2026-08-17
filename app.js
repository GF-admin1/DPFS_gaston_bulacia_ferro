const express = require('express');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

// Configuración de sesión
app.use(session({
    secret: 'SecretoDeLexStore',
    resave: false,
    saveUninitialized: false
}));

app.use(userLoggedMiddleware);

// Rutas
const productsRoutes = require('./routes/productsRoutes');
const userRoutes = require('./routes/users');

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Para capturar información de formularios (POST)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

// Usar las rutas
app.use('/products', productsRoutes);
app.use('/users', userRoutes);

// Ruta principal (Home)
app.get('/', (req, res) => {
    res.render('index');
});

// Otras rutas vistas generales
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
