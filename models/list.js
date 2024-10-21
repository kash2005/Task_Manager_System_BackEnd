const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Foreign key reference to User
    title: { type: String, required: true },
});

const List = mongoose.model('List', listSchema);

module.exports = List;