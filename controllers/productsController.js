const db = require('../database/models');

const productsController = {
    // Listado de productos
    index: async (req, res) => {
        try {
            const products = await db.Product.findAll({
                include: ['category']
            });
            return res.render('products/products', { products });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error al cargar los productos');
        }
    },

    // Detalle de un producto
    detail: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id, {
                include: ['category']
            });
            return res.render('products/productDetail', { product });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error al buscar el producto');
        }
    },

    // Formulario de creación
    create: async (req, res) => {
        try {
            const categories = await db.Category.findAll();
            return res.render('products/productCreate', { categories });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error al cargar el formulario');
        }
    },

    // Guardar el producto creado
    store: async (req, res) => {
        try {
            await db.Product.create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category_id: req.body.category_id,
                image: req.file ? req.file.filename : 'default-image.png'
            });
            return res.redirect('/products');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error al crear el producto');
        }
    },

    // Formulario de edición
    edit: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);
            const categories = await db.Category.findAll();
            return res.render('products/productsEdit', { product, categories });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error al cargar la edición');
        }
    },

    // Actualizar el producto
    update: async (req, res) => {
        try {
            await db.Product.update({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category_id: req.body.category_id,
                image: req.file ? req.file.filename : req.body.oldImage
            }, {
                where: { id: req.params.id }
            });
            return res.redirect('/products');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error al actualizar el producto');
        }
    },

    // Eliminar producto
    destroy: async (req, res) => {
        try {
            await db.Product.destroy({
                where: { id: req.params.id }
            });
            return res.redirect('/products');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error al eliminar el producto');
        }
    }
};

module.exports = productsController;
