const Product = require('../../models/products');
const Router = require('express').Router;
const bodyParser = require('body-parser');
const {Cors, corsOptions} = require('../cors');
const router = new Router();

router.use(bodyParser.json());
router.use(Cors(corsOptions));
/**
 * GET /products
 */
router.get("/", (req, res, next) => {
    let baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    Product.getAllProducts(0)
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
        res.json({result: "OK", message:"New product registered!"});
    })
    .catch((err) => next(err));
});

router.get("/page/:number", (req, res, next) => {
    let page = parseInt(req.params.number);
    let baseUrl = `${req.protocol}://${req.get('host')}/products`
    Product.getAllProducts(page * 5)
    .then(result => {
        let products = result.rows;

        products.forEach(product => {
            product.links = {
                self: `${baseUrl}/${product.code}`,
                collection: baseUrl
            }
        });
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        res.json(products);
    }).catch( err => next(err));
})

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


router.put("/:code",  (req, res, next) => {
    Product.update(req.params.id, req.body)
    .then( result => {
        res.status(201);
        res.setHeader('Content-Type', 'application/json');
        res.send({result: 'OK', message: `Product ${req.params.code} updated!`});
    })
    .catch((err) => next(err));  
});

router.delete("/:code", (req, res, next) => {
    Product.deleteByCode(req.params.code)
    .then(
        result =>{
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.json({result: "OK", message: `Product ${req.params.code} deleted!`});
        }
    ).catch()
});
module.exports = router;
