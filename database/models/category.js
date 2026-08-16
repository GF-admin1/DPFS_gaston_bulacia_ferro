module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        tableName: 'categories',
        timestamps: false
    };
    const Category = sequelize.define(alias, cols, config);

    Category.associate = function(models) {
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'category_id'
        });
        Category.hasMany(models.User, {
            as: 'users',
            foreignKey: 'category_id'
        });
    }

    return Category;
};
