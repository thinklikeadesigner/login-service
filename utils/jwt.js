const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const generateToken = (id) => jwt.sign(
  { id },
  NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' },
);

module.exports = { generateToken };
