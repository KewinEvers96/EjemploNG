const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../../models/users');
const auth = require('../authenticate');
const passport = require('passport');
const {Cors, corsOptions} = require('../cors');

router.use(bodyParser.json());
router.use(Cors(corsOptions));

router.post("/login",passport.authenticate('local', {session: false}), (req, res, next) => {
    User.getUserByUsername(req.body.username, (err, result) => {
        if (err) {
            return next(err);
        }
        let user = {username: req.body.username, employee_id: result.rows[0].employee_id}
        let token = auth.getToken(user);
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.json({result: 'OK', token: token, message: `Welcome ${req.body.username}!`});
    });
});


module.exports = router;
