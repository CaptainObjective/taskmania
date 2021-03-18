const router = require('express').Router();

const { validateTodo } = require('../models/todo');

router.get('/', async (req, res) => {
  const todos = req.user.todos;
  res.json(todos);
});

router.post('/', async (req, res) => {
  const { error, value } = validateTodo(req.body);
  if (error) return res.status(400).json({ error });

  const [todo] = req.user.todos.addToSet(value);
  await req.user.save();
  res.status(201).json(todo);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  console.log('🚀 ~ file: todo.js ~ line 21 ~ router.delete ~ id', id);

  const [todo] = req.user.todos.remove({ _id: id });
  await req.user.save();
  res.status(201).json(todo);
});

module.exports = router;
