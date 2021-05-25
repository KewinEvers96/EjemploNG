const Product = require('../../models/products');
const Router = require('express').Router;
const bodyParser = require('body-parser');

const router = new Router();

router.use(bodyParser.json());

/**
 * GET /products
 */
router.get("/", (req, res, next) => {
    let baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    Product.getAllProducts()
    .then((result) => {
        let products = result.rows;

        products.forEach( product => {
            product.links = {
                self : `${baseUrl}/${product.code}`,
                collection: baseUrl
            }
        });
        res.status (200);
        res.setHeader("Content-Type", 'application/json');
        res.json(products);
    })
    .catch((err) => next(err));
});
/*
* POST /products
*/

router.post("/", (req, res, next) => {
    let product = {}
    product.name = req.body.name;
    product.price = parseFloat(req.body.price);
    product.quantity = parseInt(req.body.quantity);
    Product.createProduct(product)
    .then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.status(201);
        res.json(result);
    })
    .catch((err) => next(err));
});

router.get("/:id", (req, res, next) => {
    let baseUrl = `${req.protocol}://${req.get('host')}/products`
    Product.getProductById(req.params.id)
    .then((result) => {
        if(result.rows.length > 0){
            let product = result.rows[0];
            product.links = {
                self: `${baseUrl}/${product.code}`,
                collection: baseUrl
            }
            res.setHeader("Content-Type", "application/json");
            res.status(200);
            res.json(product);
        }else{
            let err = new Error("Producto no encontrado");
            err.status = 404;
            return next(err);
        }
    })
    .catch((err) => next(err));
});


router.put("/:id",  (req, res, next) => {
    Product.update(req.params.id, req.body)
    .then( result => {
        res.status(201);
        res.setHeader('Content-Type', 'application/json');
        res.send({result: 'OK', message: `Product ${product.code} updated!`});
    })
    .catch((err) => next(err));  
});
module.exports = router;
