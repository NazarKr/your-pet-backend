const jwt = require('jsonwebtoken');
require('dotenv').config();

const { httpError } = require('../helpers');
const { User } = require('../schemas');
const { ACCES_SECRET } = process.env;

const authentication = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(httpError(401));
  }

  try {
    const response = jwt.verify(token, ACCES_SECRET);

    const user = await User.findById(response._id);

    if (!user || !user.accesToken) {
      next(httpError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(httpError(401));
  }
};

module.exports = authentication;
