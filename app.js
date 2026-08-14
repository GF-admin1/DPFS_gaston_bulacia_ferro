const express = require('express');
const path = require('path');
const app = express();

// Configure EJS Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up public files (such as CSS and images)
app.use(express.static(path.join(__dirname, 'public')));

// Main route (Home)
app.get('/', (req, res) => {
    res.render('index');
});

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

// Start Server on Port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
