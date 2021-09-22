module.exports.ErrorNameHandler = (err, res) => {
  switch (err.name) {
    case 'CastError':
      return res
        .status(400)
        .send({
          message: 'cannot create an ObjectID from your request body.',
        });

    case 'DocumentNotFoundError':
      return res
        .status(404)
        .send({
          message: 'a document by that id or set of attributes which does not exist',
        });
    case 'ValidationError':
      return res
        .status(400)
        .send({
          message: 'failed validation',
        });
    case 'UnauthorizedError':
      return res
        .status(401)
        .send({
          message: 'authorization required',
        });
    case 'Forbidden':
      return res
        .status(409)
        .send({
          message: 'you are trying to create something that already exists',
        });
    default:
      return res
        .status(500)
        .send({ message: 'An error occurred on the server' });
  }
};
