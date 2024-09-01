const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import uuid for generating unique IDs
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://mongodb:27017/todo-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Could not connect to MongoDB', err);
});

// Define Task schema and model
const taskSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Adding an 'id' field
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);

// Create a new task
app.post('/tasks', async (req, res) => {
    try {
        const newTask = new Task({
            id: uuidv4(), // Generate a unique id for each task
            title: req.body.title
        });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Read all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Read a specific task by id
app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findOne({ id: req.params.id }); // Find by custom 'id'
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a task by id
app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findOne({ id: req.params.id }); // Find by custom 'id'
        if (task) {
            task.title = req.body.title !== undefined ? req.body.title : task.title;
            task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
            const updatedTask = await task.save();
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a task by id
app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ id: req.params.id }); // Find and delete by custom 'id'
        if (task) {
            res.status(204).send(); // No content response
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
