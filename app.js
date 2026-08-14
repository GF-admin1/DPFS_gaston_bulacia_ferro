JavaScript
const express = require('express');
const path = require('path');
const app = express();

// Configurar motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar archivos públicos (como CSS e imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal (Home)
app.get('/', (req, res) => {
    res.render('index');
});

// Iniciar servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
