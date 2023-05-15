const { Partner } = require('../schemas');

const { httpError, ctrlWrapper } = require('../helpers');

/**
 * ============================ Получение партнеров
 */
const getAllPartners = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const news = await Partner.find({}, '', {
    skip,
    limit,
  });

  res.status(200).json(news);
};

module.exports = {
  getAll: ctrlWrapper(getAllPartners),
};
