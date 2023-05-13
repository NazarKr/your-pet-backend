const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const noticeSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  category: {
    type: String,
    enum: ['sell', 'lost/found', 'in good hands'],
    required: [true, 'Category is required'],
  },
  birth: {
    type: String,
    required: [true, 'Date of birth is required'],
  },
  breed: {
    type: String,
    required: [true, 'Breed is required'],
  },
  location: {
    type: String,
    required: [true, 'City is required'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

noticeSchema.post('save', handleMongooseError);

const schemas = {
  noticeSchema,
};

const Notice = model('notice', noticeSchema);

module.exports = {
  Notice,
  schemas,
};
