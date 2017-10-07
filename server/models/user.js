const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const user = new Schema({
    _id: { type: ObjectId, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    contact: { type: String },
    createdDate: { type: Date, default: Date.now },
    roles: [{ type: ObjectId, ref: 'roles', required: true }]
}, { skipVersioning: true, versionKey: false });

var users = mongoose.model('users', user);
module.exports = users;