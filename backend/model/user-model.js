const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    gender: { type: String, enums: ['male', 'female', 'other'], required: true },
    role: { type: String, defualt: 'user' },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    dob: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
}, {timestamps: true})

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;