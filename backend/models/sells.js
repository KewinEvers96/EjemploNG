const db = require('../db');

// insertion

const createSell = "INSERT INTO sells(quantity, value, employee_id, product_code) VALUES($1, $2, $3, $4)";

// reading

const getSells = "SELECT s.code, p.name producto, s.quantity, s.value, em.name empleado FROM sells s INNER JOIN employees em ON em.id = s.employee_id INNER JOIN products p ON p.code = s.product_code ORDER BY s.code ASC LIMIT 5 OFFSET $1";
const findById = "SELECT s.code, p.name producto, s.quantity, s.value, em.name empleado FROM sells s INNER JOIN employees em ON em.id = s.employee_id INNER JOIN products p ON p.code = s.product_code WHERE s.code= $1";

const deleteAllSells = "DELETE FROM sells";
const deleteById = "DELETE FROM sells WHERE code = $1";

let Sell = {}

Sell.findAllSells = (page, callback) => {
    return db.query(getSells, [page], callback);
}

Sell.findById = (id, callback) => {
    return db.query(findById, [id], callback);
}

Sell.deleteAll = (callback) => {
    return db.query(deleteAllSells, [], callback);
}

Sell.deleteById = (id, callback) => {
    return db.query(deleteById, [id], callback);
}

Sell.createSell = (sell, employeeId, productCode, callback) => {
    return db.query(createSell, [sell.quantity, sell.value, employeeId, productCode]);
}

module.exports = Sell;
