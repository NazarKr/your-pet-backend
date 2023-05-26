const { Article } = require('../schemas');

const { httpError, ctrlWrapper, totalPages } = require('../helpers');

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

  const total = await Article.countDocuments();

  res.status(200).json({
    data: news,
    currentPage: page,
    totalPages: totalPages(total, limit),
  });
};

/**
 * ============================ Поиск новостей
 */
const findNews = async (req, res) => {
  const { query = null, page = 1, limit = 10 } = req.query;

  if (!query) {
    throw httpError(400, 'Query parameter required');
  }

  const skip = (page - 1) * limit;

  const news = await Article.find({ $text: { $search: query } }, '', {
    skip,
    limit,
  });

  const total = await Article.countDocuments({ $text: { $search: query } });

  if (!news) {
    throw httpError(404);
  }

  res.status(200).json({
    data: news,
    currentPage: page,
    totalPages: totalPages(total, limit),
  });
};

module.exports = {
  getAll: ctrlWrapper(getAllNews),
  find: ctrlWrapper(findNews),
};
