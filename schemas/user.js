const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const emailRegexp = require('./emailRegexp');

const Joi = require('joi')
  .extend(require('@joi/date'))
  .extend(require('joi-phone-number'));

const phoneRegex =
  /^(\+?\d{1,3}\s?-?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}$/;

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;

const user = new Schema(
  {
    name: {
      type: String,
      min: [3, 'Name should have a minimum length of 3'],
      max: [20, 'Name should have a maximum length of 20'],
      default: null,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      min: [6, 'Password should have a minimum length of 6'],
      max: [16, 'Password should have a maximum length of 16'],
    },
    email: {
      required: [true, 'Email is required'],
      type: String,
      match: emailRegexp,
      unique: true,
    },
    birthday: {
      type: Date,
      default: null,
    },
    phone: {
      type: String,
      match: phoneRegex,
      default: null,
    },
    city: {
      type: String,
      min: [8, 'City should have a minimum length of 3'],
      max: [20, 'City should have a maximum length of 20'],
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
      required: [true, 'Avatar url is required'],
    },
    pets: {
      type: [{ type: Schema.Types.ObjectId, ref: 'pets' }],
      default: [],
    },
    notices: {
      type: [{ type: Schema.Types.ObjectId, ref: 'notices' }],
      default: [],
    },
    favorite: {
      type: [{ type: Schema.Types.ObjectId, ref: 'notices' }],
      default: [],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifycationToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

/**
 * Схема валидации регистрации пользователя.
 */
const userRegisterShema = Joi.object({
  password: Joi.string().min(6).max(16).regex(passwordRegex).messages({
    'any.required': `"Password" is required`,
    'string.empty': `"Password" cannot be empty`,
    'string.base': `"Password" must be string`,
    'string.min': `"Password" should have a minimum length of {#limit}`,
    'string.max': `"Password" should have a maximum length of {#limit}`,
    'string.pattern.base': `"Password" should have at least 1 uppercase letter, 1 lowercase letter and 1 digit!`,
  }),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
});

/**
 * Схема валидации email.
 */
const emailShema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
});

/**
 * Схема валидации логина пользователя.
 */
const userLoginShema = Joi.object({
  password: Joi.string().min(6).max(16).regex(passwordRegex).messages({
    'any.required': `"Password" is required`,
    'string.empty': `"Password" cannot be empty`,
    'string.base': `"Password" must be string`,
    'string.min': `"Password" should have a minimum length of {#limit}`,
    'string.max': `"Password" should have a maximum length of {#limit}`,
    'string.pattern.base': `"Password" should have at least 1 uppercase letter, 1 lowercase letter and 1 digit!`,
  }),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
});

/**
 * Схема валидации обновления профиля пользователя.
 */

const userUpdateShema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.empty': `"Name" cannot be empty`,
    'string.base': `"Name" must be string`,
    'string.min': `"Name" should have a minimum length of {#limit}`,
    'string.max': `"Name" should have a maximum length of {#limit}`,
  }),

  password: Joi.string().min(6).max(16).regex(passwordRegex).messages({
    'any.required': `"Password" is required`,
    'string.empty': `"Password" cannot be empty`,
    'string.base': `"Password" must be string`,
    'string.min': `"Password" should have a minimum length of {#limit}`,
    'string.max': `"Password" should have a maximum length of {#limit}`,
    'string.pattern.base': `"Password" should have at least 1 uppercase letter, 1 lowercase letter and 1 digit!`,
  }),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),

  birthday: Joi.date().format('DD-MM-YYYY').iso().messages({
    'string.empty': `"Birthday" cannot be empty`,
    'string.base': `"Birthday" must be date`,
  }),

  phone: Joi.string().phoneNumber({ format: 'international' }).messages({
    'string.empty': `"Phone" cannot be empty`,
    'string.base': `"Phone" must be string`,
  }),

  city: Joi.string().min(3).max(20).messages({
    'string.empty': `"City" cannot be empty`,
    'string.base': `"City" must be string`,
    'string.min': `"City" should have a minimum length of {#limit}`,
    'string.max': `"City" should have a maximum length of {#limit}`,
  }),
}).min(1);

user.post('save', handleMongooseError);

const userValidation = {
  userRegisterShema,
  emailShema,
  userLoginShema,
  userUpdateShema,
};

const User = model('user', user);

module.exports = { User, userValidation };
