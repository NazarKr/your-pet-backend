const HttpError = require('./httpError');

/**
 * Функция валидации данных контакта.
 */
const validateBody = shema => {
  const func = async (req, res, next) => {
    let validatedObj = {};

    if (req.file) {
      const { fieldname, path } = req.file;
      validatedObj = { ...req.body, [fieldname]: path };
    } else {
      validatedObj = { ...req.body };
    }

    const { error } = shema.validate(validatedObj);

    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
