const router = require('express').Router();

const { validateTodo } = require('../models/todo');

router.get('/', async (req, res) => {
  const todos = req.user.todos;
  res.json(todos);
});

router.post('/', async (req, res) => {
  const { error, value } = validateTodo(req.body);
  if (error) return res.status(400).json({ error });

  const todos = req.user.todos;
  todos.push(value);
  await req.user.save();
  res.status(201).json(todos);
});

module.exports = router;
