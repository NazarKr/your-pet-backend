const { User, userValidation } = require('../schemas/user');

const { Notice, schemas } = require('./notice');

module.exports = { User, userValidation, Notice, schemas };
