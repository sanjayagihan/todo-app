const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Adding an 'id' field
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;