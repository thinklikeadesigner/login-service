const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { authErrorMessage } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Authorization required' });
  }

  const token = authorization.replace('Bearer ', '');
  console.log(token);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

    /*
    COMPLETE In development mode (process.env.NODE_ENV !== 'production'),
    the code runs and works fine and an error won't occur if there is
    no .env file present.
https://snipboard.io/GEUQyr.jpg
*/
  } catch (err) {
    throw new AuthError(authErrorMessage);
    /*
      COMPLETE Errors are handled by a centralized handler.
https://snipboard.io/q4psnV.jpg Middleware violates the principle
of centralized error handling. Instead of returning a response directly,
it should throw an appropriate exception.
      */
  }

  req.user = payload; // assigning the payload to the request object

  return next(); // sending the request to the next middleware
};

// https://snipboard.io/epiEsK.jpg If the email and/or password is not correct, the login controller should return 401 status. More about 401 status you can learn here https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
