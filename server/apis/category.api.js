const express = require('express'),
httpStatus = require('http-status');

const router = express.Router();
const category = require('../models/category');

router.get('/', (req, res) => {
category.find({}).then((docs) => {
    res.status(httpStatus.OK).send(docs);
}).catch((err) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
});
}).get('/:id', (req, res) => {
let id=req.params.id;
category.findById(id).then((doc) => {
    res.status(httpStatus.OK).send(doc);
}).catch((err) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
});
}).post('/', (req, res) => {
const obj = new category(req.body);
obj.save().then(() => {
    res.status(httpStatus.CREATED).send();
}).catch((err) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
});
}).put('/:id', (req, res) => {
let id=req.params.id;
let obj=req.body;
category.findByIdAndUpdate(id,{name:obj.name, bio:obj.bio}).then(() => {
    res.status(httpStatus.OK).send();
}).catch((err) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
});
}).delete('/:id', (req, res) => {
let id=req.params.id;
category.findByIdAndRemove(id).then(() => {
    res.status(httpStatus.OK).send();
}).catch((err) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
});
});

module.exports = router;