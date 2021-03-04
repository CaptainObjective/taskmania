const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User, validateUser } = require('../models/user');

const jwtKey = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
  const { value, error } = validateUser(req.body);
  if (error) return res.status(400).json({ error });

  let user = await User.findOne({ email: value.email });
  if (user) return res.status(400).json({ error: 'User with this email already registered' });

  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(value.password, salt);
  value.password = hashedPassword;

  user = new User(value);
  await user.save();

  const token = jwt.sign({ id: user._id }, jwtKey);

  res.header('Authorization', token).json({ user });
});

router.post('/login', async (req, res) => {
  const { value, error } = validateUser(req.body);
  if (error) return res.status(400).json({ error });

  const user = await User.findOne({ email: value.email });
  if (!user) return res.status(400).json({ error: 'Invalid email or password' });

  const isPasswordCorrect = await bcrypt.compare(value.password, user.password);
  if (!isPasswordCorrect) return res.status(400).json({ error: 'Invalid email or password' });

  const token = jwt.sign({ id: user._id }, jwtKey, { expiresIn: 60 * 60 * 24 });

  res.header('Authorization', token).json({ user });
});

module.exports = router;
