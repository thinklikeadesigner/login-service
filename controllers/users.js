const NotFoundError = require('../errors/NotFoundError');
const { notFoundErrorMessage } = require('../utils/constants');
const User = require('../models/users');

module.exports.getUserId = (req, res, next) =>

  // eslint-disable-next-line implicit-arrow-linebreak
  User.findById(req.user.id)

    .then((user) => {
      if (!user) throw new NotFoundError(notFoundErrorMessage);
      return res.send(user);
    })
    .catch(next);
