const db = require('../db');

const getUserByUsername = "SELECT * FROM users WHERE username = $1"; 

let User = {}

User.getUserByUsername = (username, callback) => {
    return db.query(getUserByUsername, [username], callback);
}

module.exports = User;
