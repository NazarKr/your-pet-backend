const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const noticeSchema = new Schema(
  {
    category: {
      type: String,
      enum: ['sell', 'lostFound', 'inGoodHands'],
      required: [true, 'Category is required'],
    },
    title: {
      type: String,
      min: [3, 'Title should have a minimum length of 3'],
      max: [20, 'Title should have a maximum length of 20'],
      required: [true, 'Title is required'],
    },
    name: {
      type: String,
      min: [3, 'Name should have a minimum length of 3'],
      max: [20, 'Name should have a maximum length of 20'],
      required: [true, 'Name is required'],
    },
    birthday: {
      type: Date,
      required: [true, 'Birthday is required'],
    },
    breed: {
      type: String,
      min: [3, 'Breed should have a minimum length of 3'],
      max: [20, 'Breed should have a maximum length of 20'],
      required: [true, 'Breed is required'],
    },
    sex: {
      type: String,
      enum: ['female', 'male'],
      required: [true, 'Sex is required'],
    },
    location: {
      type: String,
      min: [3, 'City should have a minimum length of 3'],
      max: [20, 'City should have a maximum length of 20'],
      required: [true, 'City is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      default: 0,
    },
    comment: {
      type: String,
      min: [3, 'Comment should have a minimum length of 3'],
      max: [120, 'Comment should have a maximum length of 120'],
      required: [true, 'Comment is required'],
    },
    noticeImage: {
      type: String,
      required: [true, 'Image is required'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// =========================================================== Joi схема ==========================================================

// ================ Стандартні налаштування схеми (без обов'язкової ціни)
const joiStandartSchemaConfig = {
  category: Joi.string().required().messages({
    'any.required': `"Category" is required`,
  }),

  title: Joi.string().required().messages({
    'any.required': `"Title" is required`,
    'string.empty': `"Title" cannot be empty`,
    'string.base': `"Title" must be string`,
  }),

  name: Joi.string().required().messages({
    'any.required': `"Name" is required`,
    'string.empty': `"Name" cannot be empty`,
    'string.base': `"Name" must be string`,
  }),

  // .format('YYYY-MM-DD').iso()

  birthday: Joi.date().messages({
    'string.empty': `"Birthday" cannot be empty`,
    'string.base': `"Birthday" must be date`,
  }),

  breed: Joi.string().min(3).max(20).required().messages({
    'any.required': `"Breed" is required`,
    'string.empty': `"Breed" cannot be empty`,
    'string.base': `"Breed" must be string`,
  }),

  sex: Joi.string().required().messages({
    'any.required': `"Sex" is required`,
    'string.empty': `"Sex" cannot be empty`,
    'string.base': `"Sex" must be string`,
  }),

  location: Joi.string().min(3).max(20).required().messages({
    'any.required': `"Location" is required`,
    'string.empty': `"Location" cannot be empty`,
    'string.base': `"Location" must be string`,
  }),

  comment: Joi.string().min(3).max(120).required().messages({
    'any.required': `"Comment" is required`,
    'string.empty': `"Comment" cannot be empty`,
    'string.base': `"Comment" must be string`,
  }),

  noticeImage: Joi.string().messages({
    'any.required': `"Image" is required`,
    'string.empty': `"Image" cannot be empty`,
    'string.base': `"Image" must be string`,
  }),
};

// ================= Схема для sell категорії
const sellSchema = Joi.object({
  ...joiStandartSchemaConfig,
  price: Joi.number().required().messages({
    'any.required': `"Price" is required`,
    'string.empty': `"Location" cannot be empty`,
    'string.base': `"Price" must be number`,
  }),
});

// ================= Схема для lostFound/InGoodHands категорії
const lostFound_inGoodHandsSchema = Joi.object(joiStandartSchemaConfig);

// ================= Схема для додавання до обраних(Favorite)

noticeSchema.post('save', handleMongooseError);

const schemas = {
  noticeSchema,
  sellSchema,
  lostFound_inGoodHandsSchema,
};

const Notice = model('notice', noticeSchema);

module.exports = {
  Notice,
  schemas,
};
