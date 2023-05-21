const isValidId = require('./isValidId');
const authentication = require('./authentication');
const imageUpload = require('./imageUpload');
const passport = require('./google-authenticate');

module.exports = {
  isValidId,
  authentication,
  imageUpload,
  passport,
};
