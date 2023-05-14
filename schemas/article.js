const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const article = new Schema(
  {
    imgUrl: {
      type: String,
      required: [true, 'Image url is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      min: [3, 'Title should have a minimum length of 3'],
      max: [20, 'Title should have a maximum length of 20'],
    },
    text: {
      type: String,
      required: [true, 'Text is required'],
      min: [30, 'Title should have a minimum length of 3'],
      max: [200, 'Title should have a maximum length of 20'],
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
      min: [30, 'Title should have a minimum length of 3'],
      max: [200, 'Title should have a maximum length of 20'],
    },
    url: {
      type: String,
      required: [true, 'Url is required'],
    },
    id: {
      type: String,
      required: [true, 'Id is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

article.post('save', handleMongooseError);

const Article = model('article', article);

// Article.collection.createIndex({ title: 'text', content: 'text' });

module.exports = { Article };
