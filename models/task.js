const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    list: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true }, // Foreign key reference to List
    title: { type: String, required: true },
});

const task = mongoose.model('Task', taskSchema);

module.exports = task;