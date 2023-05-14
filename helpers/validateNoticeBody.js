const HttpError = require('./httpError');

const validateNoticeBody = shema => {
  if (categoryName === 'sell') {
    const func = async (req, res, next) => {
      const { error } = shema.validate(req.body);

      if (error) {
        next(HttpError(400, error.message));
      }
      next();
    };
    return func;
  }
};
