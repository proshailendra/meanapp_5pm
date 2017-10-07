const express = require('express'),
httpStatus = require('http-status'),
jwt = require('jsonwebtoken'),
mongoose = require('mongoose'),
router = express.Router();

const user = require('../models/user');
const role = require('../models/role');
var superSecret = 'dotnettricks';

router.post('/', (req, res) => {
let obj = req.body;
user.findOne({ email: obj.email, password: obj.password })
    .select('_id name contact email password roles')
    .populate('roles')
    .exec(function (err, user) {
        if (err) res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);

        if (user !== undefined && user !== null) {
            var roles = [];
            for (var i = 0; i < user.roles.length; i++) {
                roles.push(user.roles[i].name);
            }

            // if user found then create a token
            var token = jwt.sign({
                email: user.email,
                password: user.password,
                roles: roles
            }, superSecret, {
                    expiresIn: 1440 * 60 // expires in 24 hours
                });
            //  console.log(token);    
            var authObj = {
                userId: user._id,
                email: user.email,
                name: user.name,
                contact: user.contact,
                roles: roles,
                token: token
            };
            // console.log(token);

            // return the information including token as JSON
            res.status(httpStatus.OK).send(authObj);
        } else {
            res.status(httpStatus.NOT_FOUND).send();
        }
    });
});
router.post('/signup', (req, res) => {
var body = req.body;
var obj = new user(body);

role.findOne({ name: body.role }, function (err, res_role) {
    if (err) return res.send(err);

    obj.roles = [];
    var id = mongoose.Types.ObjectId(res_role._id);
    obj.roles.push(id);

    obj.save(function (err) {
        if (err) {
            // duplicate entry
            if (err.code === 11000)
                return res.status(httpStatus.CONFLICT).send('This username is already exists.');
            return res.send(err);
        } else {
            var _id = mongoose.Types.ObjectId(obj._id);
            res_role.users.push(_id);
            res_role.save(function (err) {
                if (err) res.status(httpStatus.INTERNAL_SERVER_ERROR);
            });
        }
        // return a message
        res.status(httpStatus.CREATED);
    });
});
});

module.exports = router;