const { Notice } = require('../schemas');

const listAllNotice = async (req, res) => {
  // const { _id: owner } = req.user;
  // const { page = 1, limit = 2 } = req.query;
  // const skip = (page - 1) * limit;
  const result = await Notice.getAll();
  res.json(result);
};

const listFavoriteNotice = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Notice.getAll({ owner }).populate('category');
  res.json(result);
};

const getNoticeByCategory = async (req, res) => {
  const { category } = req.params;
  const result = await Notice.find({ category });
  if (!result) {
    throw HttpError(404, `Notice with id:${id} not found`);
  }
  res.json(result);
};

const addNotice = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Notice.create({ ...req.body, owner });
  if (!result) {
    throw HttpError(404, `Notice with id:${id} not found`);
  }
  res.status(201).json(result);
};

const deleteNotice = async (req, res) => {
  const { id } = req.params;
  const result = await Notice.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Notice with id:${id} not found`);
  }
  res.json({
    message: `Notice with id:${id} deleted`,
  });
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Notice.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Notice with id:${id} not found`);
  }
  res.json(result);
};

module.exports = {
  listAllNotice,
  getNoticeByCategory,
  addNotice,
  deleteNotice,
  updateFavorite,
};
