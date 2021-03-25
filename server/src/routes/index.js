const { Router, static } = require('express');

const path = require('path');
const router = Router();

const authMiddleware = require('../middlewares/auth');
const auth = require('./auth');
const todo = require('./todo');

router.use('/auth', auth);
router.use('/api/todos', authMiddleware, todo);

const publicPath = path.join(__dirname, '../', '../', '../', '/client', '/build');

router.use(static(publicPath));

router.get('*', (req, res) => {
  const indexPath = path.join(publicPath, 'index.html');
  res.sendFile(indexPath);
});

module.exports = router;
