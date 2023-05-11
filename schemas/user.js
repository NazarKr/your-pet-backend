const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const emailRegexp = require('./emailRegexp');

const Joi = require('joi')
  .extend(require('@joi/date'))
  .extend(require('joi-phone-number'));

const phoneRegex = new RegExp(/^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6, 15}[0-9]{1}$/);

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
      min: [8, 'Password should have a minimum length of 8'],
      max: [20, 'Password should have a maximum length of 20'],
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
    accesToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
      required: [true, 'Avatar url is required'],
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
  password: Joi.string().min(8).max(20).messages({
    'any.required': `"Password" is required`,
    'string.empty': `"Password" cannot be empty`,
    'string.base': `"Password" must be string`,
    'string.min': `"Password" should have a minimum length of {#limit}`,
    'string.max': `"Password" should have a maximum length of {#limit}`,
  }),

  email: Joi.string().pattern(emailRegexp).required().messages({
    'any.required': `"Email" is required`,
    'string.empty': `"Email" cannot be empty`,
    'string.base': `"Email" must be string`,
    'string.pattern.base': `"Email" doesn't look like an email`,
  }),
});

/**
 * Схема валидации email.
 */
const emailShema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'any.required': `Missing required field email`,
    'string.empty': `"Email" cannot be empty`,
    'string.base': `"Email" must be string`,
    'string.pattern.base': `"Email" doesn't look like an email`,
  }),
});

/**
 * Схема валидации логина пользователя.
 */
const userLoginShema = Joi.object({
  password: Joi.string().min(8).max(20).messages({
    'any.required': `"Password" is required`,
    'string.empty': `"Password" cannot be empty`,
    'string.base': `"Password" must be string`,
    'string.min': `"Password" should have a minimum length of {#limit}`,
    'string.max': `"Password" should have a maximum length of {#limit}`,
  }),

  email: Joi.string().pattern(emailRegexp).required().messages({
    'any.required': `"Email" is required`,
    'string.empty': `"Email" cannot be empty`,
    'string.base': `"Email" must be string`,
    'string.pattern.base': `"Email" doesn't look like an email`,
  }),
});

/**
 * Схема валидации refresh.
 */
const refreshShema = Joi.object({
  refreshToken: Joi.string().required().messages({
    'any.required': `Refresh token is required field`,
    'string.empty': `Refresh token cannot be empty`,
  }),
});

/**
 * Схема валидации обновления профиля пользователя.
 */
const userUpdateShema = Joi.object({
  name: Joi.string().min(3).min(20).messages({
    'string.empty': `"Name" cannot be empty`,
    'string.base': `"Name" must be string`,
    'string.min': `"Name" should have a minimum length of {#limit}`,
    'string.max': `"Name" should have a maximum length of {#limit}`,
  }),

  password: Joi.string().min(8).max(20).messages({
    'string.empty': `"Password" cannot be empty`,
    'string.base': `"Password" must be string`,
    'string.min': `"Password" should have a minimum length of {#limit}`,
    'string.max': `"Password" should have a maximum length of {#limit}`,
  }),

  email: Joi.string().pattern(emailRegexp).messages({
    'string.base': `"Email" must be string`,
    'string.pattern.base': `"Email" doesn't look like an email`,
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
  refreshShema,
  userLoginShema,
  userUpdateShema,
};

const User = model('user', user);

module.exports = { User, userValidation };
