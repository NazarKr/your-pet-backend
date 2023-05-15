const { User, userValidation } = require('../schemas/user');
const { Article } = require('../schemas/article');
const { Partner } = require('../schemas/partner');
const { Notice, schemas } = require('./notice');

module.exports = { User, userValidation, Article, Partner, Notice, schemas };
