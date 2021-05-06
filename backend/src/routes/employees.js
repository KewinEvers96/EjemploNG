const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Employee = require('../../models/employees');
const Multer = require('multer');
const url = require('url');
const {Cors, corsOptions} = require('../cors');
const fs = require('fs');

router.use(bodyParser.json());

let storage = Multer.diskStorage({
    destination: function(req, file, cb ) {
        cb(null, 'public/img/employees');
    }, filename : function (req, file, cb) {
        let extension;
        if (file.mimetype == 'image/jpeg')
            extension = 'jpg';
        else if (file.mimetype == 'image/png')
            extension = 'png';
        cb(null, `${file.fieldname}_${Date.now()}.${extension}` );
    }
});


let upload = Multer({storage : storage});
/**
 * GET /employees
 * get last employees
 */

/**
 * Definition of Cors
 */
router.use(Cors(corsOptions));

router.get("/",  (req, res, next) => {
    Employee.findAllEmployees()
    .then((result) => {
        let employees = [];
        result.rows.forEach(employee => {
            employee.links = {
                self: "http://localhost:8000/employees/" + employee.id,
                collection : "http://localhost:8000/employees"
            }
            employees.push(employee);
        });
        return employees;
    })
    .then((employees) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        return res.json(employees);
    })
    .catch((err) => next(err));
});

/**
 * POST /employees 
 * Register a new employeee 
 */

router.post("/",(req, res, next) => {
    let employee = {}
    employee.name = req.body.name;
    employee.lastName = req.body.lastname;
    employee.salary = parseFloat(req.body.salary);
    
    Employee.create(employee)
    .then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        res.json({registration: true, inserted:result.rowCount});
    })
    .catch((err) => next(err));
});

/**
 * DELETE /employees
 * deletes all employees
 */

router.delete("/", (req, res,next) => {
    Employee.deleteAllEmployees()
    .then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        res.json({deleted: true, deletes: result.rowCount});
    })
    .catch((err) => next(err));
});

/**
 * GET /search
 * search by name or last name an employee
 */

router.get("/search", (req, res, next) => {
    if(req.query.name){
        Employee.findByName(req.query.name)
        .then((result) => {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(result.rows);
        })
        .catch((err) => next(err));
    }else if(req.query.lastname){
        Employee.findByLastName(req.query.lastname)
        .then((result) => {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(result.rows);
        })
        .catch((err) => next(err));
    }
});

/**
 * GET /employees/:id
 * get employee identified with a given ID
 */

router.get("/:id", (req, res, next) => {
    Employee.findById(req.params.id)
    .then((result) => {

        let empleado = result.rows[0];
        empleado.links = { 
            self : "http://localhost:8000/employees/" + empleado.id,
            collection: "http://localhost:8000/employees"
        }
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.json(empleado);
    })
    .catch((err) => next(err));
});

/**
 * PUT /employees/:id
 * Updates employees all attributes 
 */

router.put("/:id", searchEmployeeExistance, (req, res, next) => {
    let employee = {}
    
    employee.name = req.body.name;
    employee.lastname = req.body.lastname;
    employee.salary = parseFloat(req.body.salary);

    Employee.updateById(req.params.id, employee )
    .then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        res.json(result);
    })
    .catch((err) => next(err));
});

/**
 * DELETE /employees/:id
 */
router.delete("/:id", (req, res, next) => {
    Employee.deleteById(req.params.id)
    .then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        res.json(result);
    })
    .catch((err) => next(err));
});

/**
 * POST /employees/:id/photo
 */
router.post("/:id/photo", searchEmployeeExistance ,upload.single('photo'), (req, res, next) => {

    Employee.findById(req.params.id)
    .then( result => {
        fs.unlink(`public/${result.rows[0].imageurl}`, (err) => {
            if (err)
                throw err;
        });
    }).catch( err => next(err));

    Employee.updatePhotoById(req.params.id, {photo: `img/employees/${req.file.filename}`})
    .then( result => {
        res.setHeader('Content-Type','application/json');
        res.status(200);
        res.json({message: "OK", result : 'Photo uploaded'});
    })
    .catch( err => next(err));
});

function searchEmployeeExistance (req, res, next) {
    Employee.findById(req.params.id)
    .then(result => {
        if (result.rows.length > 0){
            next();
        }
        else {
            let error = new Error("There is not Employee registered with that ID!");
            return next(error);
        }
    })
    .catch( err => next(err));
}

module.exports = router;
