const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { createList, updateList, deleteList, getLists } = require('../controllers/listController');

router.post('/list', authenticate, createList);
router.put('/list/:id', authenticate, updateList);
router.delete('/list/:id', authenticate, deleteList);
router.get('/lists', authenticate, getLists);

module.exports = router;