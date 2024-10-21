const Task = require('../models/task'); // Make sure the path is correct

exports.createTask = async (req, res) => {
    const { list, title, priority } = req.body;

    try {
        const newTask = new Task({
            list,
            title,
            priority,
            completed: false 
        });

        const savedTask = await newTask.save();

        res.status(201).json({
            message: 'Task created successfully',
            task: savedTask
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create task',
            error: error.message
        });
    }
};

exports.updateTask = async (req, res) => {
    const taskId = req.params.id;
    const { title, priority, completed } = req.body; // Extract the fields to be updated

    try {
        // Find the task by its ID and update it with the new values
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title, priority, completed }, // Fields to update
            { new: true } // Return the updated document
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.status(200).json({
            message: 'Task updated successfully',
            task: updatedTask
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update task',
            error: error.message
        });
    }
};

exports.deleteTask = async (req, res) => {
    const taskId = req.params.id; // The task ID will be in the URL

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.status(200).json({
            message: 'Task deleted successfully',
            task: deletedTask // Optional: Return the deleted task details if needed
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete task',
            error: error.message
        });
    }
};

// Controller to get a task by its ID
exports.getTaskById = async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.status(200).json({
            message: 'Task get successfully',
            task: task
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to get task',
            error: error.message
        });
    }
};

// Controller to get all tasks for a specific list
exports.getTasksByListId = async (req, res) => {
    const listId = req.params.listId;

    try {
        const tasks = await Task.find({ list: listId });

        if (tasks.length === 0) {
            return res.status(200).json({
                message: 'No tasks found for this list'
            });
        }

        res.status(200).json({
            message: 'Tasks get successfully',
            tasks: tasks
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to get tasks',
            error: error.message
        });
    }
};
