const {Router} = require('express');
const cors = require('cors');
const {getTodo, postTodo, deleteTodo, updateTodo, getSingleTodo} = require('./todos.controller')

const router = Router();

router.route('/').get(cors(), getTodo).post(cors(), postTodo);

router.route('/:id').get(getSingleTodo).delete(cors(), deleteTodo).patch(cors(), updateTodo);

module.exports = router;