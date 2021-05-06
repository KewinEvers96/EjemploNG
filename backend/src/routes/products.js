const Product = require('../../models/products');
const Router = require('express').Router;
const bodyParser = require('body-parser');

const router = new Router();

router.use(bodyParser.json());

router.get("/", (req, res, next) => {
    Product.getAllProducts()
    .then((result) => {
        res.status (200);
        res.setHeader("Content-Type", 'application/json');
        res.json(result.rows);
    })
    .catch((err) => next(err));
});

router.post("/", (req, res, next) => {
    let product = {}
    product.name = req.body.name;
    product.price = parseFloat(req.body.price);
    product.quantity = parseInt(req.body.quantity);
    Product.createProduct(product)
    .then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        res.json(result);
    })
    .catch((err) => next(err));
});

router.get("/:id", (req, res, next) => {
    Product.getProductById(req.params.id)
    .then((result) => {
        if(result.rows.length > 0){
            res.setHeader("Content-Type", "application/json");
            res.status(200);
            res.json(result.rows[0]);
        }else{
            let err = new Error("Producto no encontrado");
            err.status = 404;
            return next(err);
        }
    })
    .catch((err) => next(err));
});

router.put("/:id",  (req, res, next) => {
    
});
module.exports = router;
