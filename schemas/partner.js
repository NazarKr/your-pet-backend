const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const { emailRegexp, phoneRegex } = require('./validationRegexps');

const partner = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      min: [3, 'Title should have a minimum length of 3'],
      max: [20, 'Title should have a maximum length of 20'],
    },
    url: {
      type: String,
    },
    addressUrl: {
      type: String,
      required: [true, 'Address url is required'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Image url is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      max: [30, 'Address should have a maximum length of 30'],
    },
    workDays: [
      {
        isOpen: { type: Boolean },
        from: { type: String },
        to: { type: String },
      },
      {
        isOpen: { type: Boolean },
        from: { type: String },
        to: { type: String },
      },
      {
        isOpen: { type: Boolean },
        from: { type: String },
        to: { type: String },
      },
      {
        isOpen: { type: Boolean },
        from: { type: String },
        to: { type: String },
      },
      {
        isOpen: { type: Boolean },
        from: { type: String },
        to: { type: String },
      },
      {
        isOpen: { type: Boolean },
        from: { type: String },
        to: { type: String },
      },
      {
        isOpen: { type: Boolean },
        from: { type: String },
        to: { type: String },
      },
    ],
    phone: {
      required: [true, 'Phone is required'],
      type: String,
      match: phoneRegex,
      default: null,
    },
    email: {
      required: [true, 'Email is required'],
      type: String,
      match: emailRegexp,
    },
  },
  { versionKey: false, timestamps: true }
);

partner.post('save', handleMongooseError);

const Partner = model('partner', partner);

module.exports = { Partner };
