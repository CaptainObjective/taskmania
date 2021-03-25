const jwt = require('jsonwebtoken');

const { User } = require('../models/user');
const jwtKey = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Auth token missing' });

  try {
    const { id } = jwt.verify(token, jwtKey);

    const user = await User.findById(id);
    if (!user) return res.status(401).json({ error: 'This user does not exist' });

    req.user = user;
    next();
  } catch (ex) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
module.exports = authMiddleware;
