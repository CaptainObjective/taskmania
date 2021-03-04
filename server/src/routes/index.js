const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');
const auth = require('./auth');
const todo = require('./todo');

router.use('/auth', auth);
router.use('/api/todo', authMiddleware, todo);

module.exports = router;
