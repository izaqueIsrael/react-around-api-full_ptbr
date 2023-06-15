class NotModified extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 304;
  }
}

module.exports = NotModified;
