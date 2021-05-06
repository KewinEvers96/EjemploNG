const db = require('../db');

/**
 * PSQL queries
 */

const createProduct = "INSERT INTO producto(nombre, precio, cantidad) VALUES ($1, $2, $3)";
const getProductById = "SELECT nombre, precio, cantidad FROM producto WHERE id = $1";

const getAllProducts = "SELECT * FROM producto";

const updateAllAttrProductById = "UPDATE producto SET nombre = $1, precio = $2, cantidad = $3 WHERE id = $4"

/**
 * Product functions
 */

let Product = {}

Product.createProduct = (product, callback) => {
    let params = [product.name, product.price, product.quantity];
    return db.query(createProduct, params, callback);
}

Product.getAllProducts = (callback) => {
    return db.query(getAllProducts, [], callback);
}

Product.getProductById = (id, callback) => {
    return db.query(getProductById, [id], callback);
}

Product.updateAllAttrProductByID = (id, callback) => {
    return db.query(updateAllAttrProductById, [id], callback);
}

module.exports = Product;
