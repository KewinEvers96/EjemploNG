const db = require('../db');

/**
 * PSQL queries
 */
// insertion
const createProduct = "INSERT INTO products(name, price, quantity) VALUES ($1, $2, $3)";
// reading
const getProductById = "SELECT * FROM products WHERE code = $1";
const getAllProducts = "SELECT * FROM products";
// update all attribute of product
const updateAllAttrProductByCode = "UPDATE products SET name = $1, price = $2, quantity = $3 WHERE code = $4";
const updateNamePriceByCode = "UPDATE products SET name  = $1, price = $2 WHERE code = $3";
const updateNameQuantityByCode = "UPDATE products SET name = $1, quantity = $2 WHERE code = $3";
const updateNameByCode = "UPDATE products SET name = $1 WHERE code = $2";
const updatePriceByCode = "UPDATE products SET price = $1 WHERE code = $2";
const updateQuantityByCode = "UPDATE products SET quantity = $1 WHERE code = $2";

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

Product.update = (id, newProduct, callback) => {
    if(newProduct.name && newProduct.price && newProduct.quantity){
        return db.query(updateAllAttrProductByCode, [newProduct.name, newProduct.price, newProduct.quantity, id], callback);
    }else if(newProduct.name && newProduct.price){
        return db.query(updateNamePriceByCode, [newProduct.name, newProduct.price, id], callback);
    }else if(newProduct.name && newProduct.quantity){
        return db.query(updateNameQuantityByCode, [newProduct.name, newProduct.quantity, id], callback);
    }else if(newProduct.name){
        return db.query(updateNameByCode, [newProduct.name, id], callback);
    }else if(newProduct.price){
        return db.query(updatePriceByCode, [newProduct.price, id], callback);
    }else if(newProduct.quantity){
        return db.query(updateQuantityByCode, [newProduct.quantity, id], callback);
    }else{
        throw new Error("No hay valor para actualizar");
    }
}

module.exports = Product;
