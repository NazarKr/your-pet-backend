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
      default: '',
    },
    date: {
      // date	обовʼязкове, дата в форматі 22.10.2022
      type: Date,
      required: [true, 'Name is required'],
      default: null,
    },
    breed: {
      type: String,
      required: [true, 'Breed is required'],
      min: [2, 'Breed should have a minimum length of 2'],
      max: [16, 'Breed should have a maximum length of 16'],
      default: '',
    },
    // file: {
    //   required: [true, 'Photo is required'],
    //   type: String,
    //   //   file	обовʼязковий, обʼємом до 3Мб
    // },
    comments: {
      type: String,
      min: [8, 'Comments should have a minimum length of 8'],
      max: [16, 'Comments should have a maximum length of 120'],
      default: '',
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
  name: Joi.string().required(),
  date: Joi.string().required(),
  breed: Joi.string().required(),
  comments: Joi.string(),
});

const petSchemas = {
  addPetSchema,
};

const Pet = model('pet', petSchema);

module.exports = {
  petSchemas,
  Pet,
};
