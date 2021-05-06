const express = require('express');
const app = express();
const path = require('path');
const PORT = 8000 || process.env.port;

/**
 * Routers
 */
const employeeRouter = require('./routes/employees');
const productRouter = require('./routes/products');
/**
 * 
 */
const publicDir = "../public";

app.use(express.static(path.join(__dirname, publicDir)));

/**
 * Routes
 */

app.use("/employees", employeeRouter);
app.use("/products", productRouter);

app.use((err, req, res, next) => {
    res.status(403);
    res.setHeader('Content-Type', 'application/json');
    res.json({error: err.message});
})

app.listen(8000, function(){
    console.log(`escuchando en el puerto ${PORT}`);
});