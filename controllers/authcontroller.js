/* eslint-disable linebreak-style */
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');
const ConflictError = require('../errors/ConflictError');
const { authErrorMessage } = require('../utils/constants');
const User = require('../models/users');
const { generateToken } = require('../utils/jwt');

const SALT_ROUND = 10;

module.exports.createUser = (req, res, next) => {
  const {
    name, password, email,
  } = req.body;

  if (!password || !email) return res.status(400).send({ message: 'email or password should not be empty!' });

  return User.findOne({ email }).then((exists) => {
    if (exists) {
      return Promise.reject(new ConflictError('you already exist!'));
    }
    return bcrypt.hash(password, SALT_ROUND)
      .then((hash) => (User.create({
        name,
        email,
        password: hash,
      })))
      .then((user) => res.status(201).send({
        id: user._id,
        email: user.email,
      }));
  }).catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) throw new AuthError(authErrorMessage);

      /*
      COMPLETE Application constants (response and error messages)
      are stored inside a separate file with constants.
      https://snipboard.io/davN92.jpg

      */
      const token = generateToken(user._id);

      return res.send({ token });
    })
    .catch(next);
};
