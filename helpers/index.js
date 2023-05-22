const ctrlWrapper = require('./ctrlWrapper');
const httpError = require('./httpError');
const validateBody = require('./validateBody');
const handleMongooseError = require('./handleMongooseError');
const sendEmail = require('./sendEmail');
const skipPages = require('./skip');
const totalPages = require('./totalPages');

module.exports = {
  ctrlWrapper,
  httpError,
  validateBody,
  handleMongooseError,
  sendEmail,
  skipPages,
  totalPages,
};
