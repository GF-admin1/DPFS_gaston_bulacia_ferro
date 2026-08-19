const db = require('../../database/models');

const productsApiController = {
    list: async (req, res) => {
        try {
            const products = await db.Product.findAll({
                include: ['category']
            });

            const categories = await db.Category.findAll({
                include: ['products']
            });

            const countByCategory = {};
            categories.forEach(category => {
                countByCategory[category.name] = category.products ? category.products.length : 0;
            });

            const productsWithDetail = products.map(product => ({
                id: product.id,
                name: product.name,
                description: product.description,
                category: product.category ? product.category.name : null,
                detail: `/api/products/${product.id}`
            }));

            return res.status(200).json({
                count: products.length,
                countByCategory: countByCategory,
                products: productsWithDetail
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    detail: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id, {
                include: ['category']
            });

            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            const productData = product.toJSON();
            productData.imageUrl = `/images/products/${product.image || 'default-image.png'}`;

            return res.status(200).json(productData);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};

module.exports = productsApiController;