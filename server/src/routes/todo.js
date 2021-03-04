const router = require('express').Router();

const { validateTodo } = require('../models/todo');

router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

router.post('/', async (req, res) => {
  const { error, value } = validateTodo(req.body);
  if (error) return res.status(400).json({ error });

  const todo = new Todo(value);
  await todo.save();
  res.status(201).json(todo);
});

router.put('/:id', async (req, res) => {
  const { error, value } = validateTodo(req.body);
  if (error) return res.status(400).json({ error });

  const todo = await Todo.findByIdAndUpdate(req.params.id, value);
  res.json(todo);
});

router.delete('/:id', async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  res.json(todo);
});

module.exports = router;
