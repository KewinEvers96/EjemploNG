
const Cors  = require('cors');


let whitelist = ["http://localhost:4200"];

let corsOptions = {
    origin : whitelist
}

module.exports = {Cors, corsOptions};