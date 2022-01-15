const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendeesSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    workshop: { type: Schema.Types.ObjectId, ref: "Workshop" },
}, {timestamps: true});

const attendeesModel = mongoose.model('Attendees', attendeesSchema);
module.exports = attendeesModel;