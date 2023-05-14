const { Article } = require('../schemas');

const { httpError, ctrlWrapper } = require('../helpers');

/**
 * ============================ Получение новостей
 */
const getAllNews = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const news = await Article.find({}, '', {
    skip,
    limit,
  });

  res.status(200).json(news);
};

/**
 * ============================ Поиск новостей
 */
const findNews = async (req, res) => {
  const { query = null } = req.query;

  if (!query) {
    throw httpError(400, 'request required');
  }

  const news = await Article.find(
    { $text: { $search: query } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });

  if (!news) {
    throw httpError(404);
  }

  res.status(200).json(news);
};

module.exports = {
  getAll: ctrlWrapper(getAllNews),
  find: ctrlWrapper(findNews),
};
