const Pool = require('pg').Pool;


const pool = new Pool({
    user: process.env.EMUSER,
    host: process.env.EMHOST,
    database: process.env.EMDATABASE,
    password: process.env.EMPASSWORD,
    port: process.env.EMPORT
});


module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
}
