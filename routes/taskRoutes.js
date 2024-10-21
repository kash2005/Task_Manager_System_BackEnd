const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { createTask, updateTask, deleteTask, getTaskById, getTasksByListId } = require('../controllers/taskController');

router.post('/task', authenticate, createTask);
router.put('/task/:id', authenticate, updateTask);
router.delete('/task/:id', authenticate, deleteTask);
// GET a single task by task ID
router.get('/task/:id', authenticate, getTaskById);
// GET all tasks for a specific list ID
router.get('/tasks/list/:listId', authenticate, getTasksByListId);

module.exports = router;