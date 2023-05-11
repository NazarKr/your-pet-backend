const { isValidObjectId } = require('mongoose');

const { httpError } = require('../helpers');

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(httpError(404, `${id} invalid format`));
  }

  next();
};

module.exports = isValidId;
