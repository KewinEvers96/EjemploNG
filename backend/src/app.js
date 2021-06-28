const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
const PORT = 8000 || process.env.port;

/**
 * Routers
 */
const employeeRouter = require('./routes/employees');
const productRouter = require('./routes/products');
const sellsRouter = require('./routes/sells');
const index = require('./routes');
/**
 * 
 */
const publicDir = "../public";

app.use(express.static(path.join(__dirname, publicDir)));

/**
 * 
 */

passport.use(new LocalStrategy((username, password, done) => {
    User.getUserByUsername(username, (err, result) => {
        if(err) {
            return done(err);
        }
        if (result.rows.length < 0){
            return done(null, false);
        }
        if ( password !== result.rows[0].password){
            return done(null, false);
        }
        
        return done(null, true);
    });
}));

app.use(passport.initialize());
/**
 * Routes
 */
app.use(index);
app.use("/employees", employeeRouter);
app.use("/products", productRouter);
app.use("/sells", sellsRouter);


app.use((err, req, res, next) => {
    res.status(403);
    res.setHeader('Content-Type', 'application/json');
    res.json({error: err.message});
})

app.listen(8000, function(){
    console.log(`escuchando en el puerto ${PORT}`);
});