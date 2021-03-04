const mongoose = require('mongoose');
const Joi = require('joi');

const { todoSchema } = require('./todo');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: {
    type: [todoSchema],
  },
});

const User = mongoose.model('User', userSchema);

const schema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required().email(),
});

const validateUser = data => {
  return schema.validate(data);
};

module.exports = { User, validateUser };
