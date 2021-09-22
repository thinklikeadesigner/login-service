class Created extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 201;
  }
}

module.exports = Created;
