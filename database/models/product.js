module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT
        },
        price: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(255)
        },
        category_id: {
            type: dataTypes.INTEGER(10).UNSIGNED
        }
    };
    let config = {
        tableName: 'products',
        timestamps: false
    };
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        });
    }

    return Product;
};
