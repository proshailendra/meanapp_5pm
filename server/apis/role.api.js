const express = require('express'),
    httpStatus = require('http-status');

const router = express.Router();

const role = require('../models/role');

router.get('/', (req, res) => {
    role.find((err, docs) => {
        if (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
            console.log(err);
        }
        else
            res.status(httpStatus.OK).json(docs);
    });
});
router.get('/:id', (req, res) => {
    let id = req.params.id;
    role.findById(id, (err, doc) => {
        if (err)
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
        else
            res.status(httpStatus.OK).json(doc);
    });
});
router.post('/', (req, res) => {
    let data = req.body;

    const obj = new role(data);
    obj.save().then(() => {
        return res.status(httpStatus.CREATED).json('created');
    }).catch((err) => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json('error');
    });
});
router.put('/:id', (req, res) => {
    let data = req.body;
    let id = req.params.id;

    role.findByIdAndUpdate(id, { name: data.name, address: data.address }, (err) => {
        if (err)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json('error');
        else
            res.status(httpStatus.OK).json('updated');
    });
});
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    role.findByIdAndRemove(id, (err) => {
        if (err)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json('error');
        else
            res.status(httpStatus.OK).json('deleted');
    });
});
module.exports = router;