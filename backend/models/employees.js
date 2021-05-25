const db = require('../db');

/**
 * Postgresql queries
 */

const insertNewEmployee = "INSERT INTO employees(name, lastname, salary) VALUES($1, $2, $3)";

const findAllEmployees = "SELECT * FROM employees ORDER BY id DESC LIMIT 5 OFFSET $1";
const findByName = "SELECT * FROM employees WHERE name LIKE '%' || $1 || '%'";
const findByLastname = "SELECT * FROM employees WHERE lastname LIKE $1";
const findById = "SELECT * FROM employees WHERE id = $1";


const deleteAllEmployees = "DELETE FROM employees";
const deleteById = "DELETE FROM employees WHERE id = $1";

const updateAllById             = "UPDATE employees SET name = $1, lastname = $2, salary = $3 WHERE id = $4";
const updateNameAndLastName     = "UPDATE employees SET name = $1, lastname = $2 WHERE id = $3";
const updateNameAndSalary       = "UPDATE employees SET name = $1, salary = $2 WHERE id = $3";
const updateLastNameAndSalary   = "UPDATE employees SET lastname = $1, salary = $2 WHERE id = $3";
const updateNameById            = "UPDATE employees SET name = $1 WHERE id = $2";
const updateLastNameById        = "UPDATE employees SET lastname = $1 WHERE id = $2";
const updateSalaryById          = "UPDATE employees SET salary = $1 WHERE id = $2";
const updatePhotoById           = "UPDATE employees SET imageUrl  = $1 WHERE id = $2";

/**
 * Functions
 */

let Employee  = {}

Employee.findAllEmployees = (page, callback) => {
    return db.query(findAllEmployees, [page], callback);
}

/**
 * Creates one employee by using an employee object
 * @param {name, lastname, salary} employee 
 * @param {*} callback 
 * @returns 
 */

Employee.create = ( employee, callback) => { 
    let params = [employee.name, employee.lastName,  employee.salary];
    return db.query(insertNewEmployee, params, callback);
}

/**
 * Finds an employee by using his Id
 * @param {*} id 
 * @param {*} callback 
 * @returns 
 */

Employee.findById = (id, callback) => {
    let params = [id];
    return db.query(findById, params, callback);
}

/**
 * Finds employees based on the similarity of a given name
 * @param {*} name 
 * @param {*} callback 
 */

Employee.findByName = (name, callback) => {
    return db.query(findByName, [name], callback);
}

/**
 * Find employees based on the similarity of a given lastname
 * @param {*} lastname 
 * @param {*} callback 
 * @returns 
 */

Employee.findByLastName = (lastname, callback) => {
    let searchedLastname = `%${lastname}%`;
    return db.query(findByLastname, [searchedLastname], callback);
}

/**
 * Deletes all employees in the dataabase
 * @param {*} callback 
 * @returns 
 */

Employee.deleteAllEmployees = (callback) => {
    return db.query(deleteAllEmployees, [], callback);
}

/**
 * Search an employee by using his id and deletes the found employee
 * @param {*} id 
 * @param {*} callback 
 * @returns 
 */
Employee.deleteById = (id, callback) => {
    return db.query(deleteById, [id], callback);
}

/**
 * Updates all atributes by using his id
 * @param {*} id 
 * @param {*} callback 
 * @returns 
 */

Employee.updateAllById = (id, employee, callback) => {
    let params = [employee.name, employee.lastname, employee.salary, id];
    return db.query(updateAllById, params, callback);
}

Employee.updateById = (id, employee, callback)  => {
    if(employee.name && employee.lastname && employee.salary) { 
        return db.query(updateAllById, [employee.name, employee.lastname, employee.salary, id], callback);
    }
    else if ( employee.name && employee.lastname ) {
        return db.query(updateNameAndLastName, [employee.name, employee.lastname, id], callback);
    }
    else if ( employee.name && employee.salary ) { 
        return db.query(updateNameAndSalary, [employee.name, employee.salary, id], callback);
    }
    else if ( employee.lastname && employee.salary ) { 
        return db.query(updateLastNameAndSalary, [employee.lastname, employee.salary, id], callback);
    }
    else if( employee.name ) {
        return db.query(updateNameById, [employee.name, id], callback);
    }
    else if( employee.lastname) {
        return db.query(updateLastNameById, [employee.lastname, id], callback);
    }
    else if( employee.salary ) {
        return db.query(updateSalaryById, [employee.salary, id], callback);
    } 
    else {
        throw new Error("No hay objeto de actualizar");
    }
}

Employee.updatePhotoById = (id, employee, callback) => {
    return db.query(updatePhotoById, [employee.photo, id], callback);
}
module.exports = Employee;
