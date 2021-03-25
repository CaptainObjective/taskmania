const mongoose = require('mongoose');
const Joi = require('joi');

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  isDone: Boolean,
});

const schema = Joi.object({
  title: Joi.string().min(1).max(20).required(),
  description: Joi.string().default(''),
  isDone: Joi.boolean().default(false),
});

const validateTodo = data => {
  return schema.validate(data);
};

module.exports = { todoSchema, validateTodo };
