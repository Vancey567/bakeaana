const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workshopSchema = new Schema({
    title: { type: String, required: true },
    description: {type: String, require: true},
    mode: { type: String, enums: ['online', 'offline'], default: 'online', required: true },
    address: { type: String, default: 'zoom' },
    date: { type: Date, required: true },
    duration: { type: Number, required: true, default: 1 },
    learnings: [{ type: String, required: true }]
}, {timestamps: true})

const workshopModel = mongoose.model('Workshop', workshopSchema);
module.exports = workshopModel;