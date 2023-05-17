const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      min: [2, 'Name should have a minimum length of 2'],
      max: [16, 'Name should have a maximum length of 16'],
    },
    birthday: {
      // date	обовʼязкове, дата в форматі 22.10.2022
      type: String,
      required: [true, 'Birthday is required'],
    },
    breed: {
      type: String,
      required: [true, 'Breed is required'],
      min: [2, 'Breed should have a minimum length of 2'],
      max: [16, 'Breed should have a maximum length of 16'],
    },
    petsImage: {
      type: String,
      required: [true, 'Image is required'],
    },
    comments: {
      type: String,
      min: [8, 'Comments should have a minimum length of 8'],
      max: [16, 'Comments should have a maximum length of 120'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

petSchema.post('save', handleMongooseError);

const addPetSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `"Name" is required`,
    'string.empty': `"Name" cannot be empty`,
    'string.base': `"Name" must be string`,
  }),

  birthday: Joi.date().messages({
    'string.empty': `"Birthday" cannot be empty`,
    'string.base': `"Birthday" must be date`,
  }),

  breed: Joi.string().required().messages({
    'any.required': `"Breed" is required`,
    'string.empty': `"Breed" cannot be empty`,
    'string.base': `"Breed" must be string`,
  }),

  comments: Joi.string().required().messages({
    'any.required': `"Comment" is required`,
    'string.empty': `"Comment" cannot be empty`,
    'string.base': `"Comment" must be string`,
  }),
});

const Pet = model('pet', petSchema);

const petSchemas = {
  petSchema,
  addPetSchema,
};

module.exports = {
  petSchemas,
  Pet,
};
