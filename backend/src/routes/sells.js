const Sell = require('../../models/sells');
const Product = require('../../models/products');
const express = require('express');
const bodyParser = require('body-parser');
const Router = express.Router;
const router = new Router();
const jwt = require('jsonwebtoken');
const {Cors, corsOptions} = require('../cors');
const auth = require('../authenticate');

router.use(bodyParser.json());
router.use(Cors(corsOptions));
router.use(auth.verifyUser);

router.get("/", (req, res, next) => {
    Sell.findAllSells(0)
    .then((result) =>{
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        res.json(result.rows);
    }).catch( err => next(err));
});

router.post("/", (req, res, next) => {
    let productCode = parseInt(req.body.productCode);
    Product.getProductById(productCode)
    .then((result) => {
        let product = result.rows[0];
        let value = parseInt(req.body.quantity) * parseFloat(product.price);
        let token = req.get("Authorization").substr(7);
        let employee_id = jwt.verify(token, process.env.SECRET).employee_id;
        if( product.quantity - parseInt(req.body.quantity) < 0 ){
            throw new Error("No se puede realizar la venta, stock insuficiente");
        }
        Product.update(productCode, {quantity: product.quantity - parseInt(req.body.quantity)})
        .then((result) => {
            return Sell.createSell({quantity: req.body.quantity, value: value}, employee_id, productCode)
            .then( (result) =>{
                res.setHeader("Content-Type", "application/json");
                res.status(201);
                res.json({message: "Sell created"});
            }).catch( err => next(err));
        })
        .catch( err => next(err));
       
    })
    .catch( err => next(err));
});

router.delete("/", auth.verifyAdmin, (req, res, next) => {
    Sell.deleteAll()
    .then((result) =>{
        res.status(200);
        res.setHeader("Content-Type","application/json");
        res.json(result);
    }).catch((err) => next(err));
});

router.get("/:sellId", (req, res, next) => {
    Sell.findById(parseInt(req.params.sellId))
    .then((result) =>{
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        res.json(result.rows[0]);
    }).catch(err => next(err));
});

router.delete("/:sellId", (req, res, next) => {
    Sell.deleteById(parseInt(req.params.sellId))
    .then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        res.json(result.rows);
    }).catch( err => next(err));
});
module.exports = router;
