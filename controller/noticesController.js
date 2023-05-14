const { Notice } = require('../schemas');

const { httpError, ctrlWrapper } = require('../helpers');

const listAllNotice = async (req, res) => {
  // const { _id: owner } = req.user;
  // const { page = 1, limit = 2 } = req.query;
  // const skip = (page - 1) * limit;
  console.log('Go');
  const result = await Notice.find({}, '-createdAt -updatedAt');
  if (!result) {
    throw httpError(404, `Blablabla not found`);
  }
  res.json(result);
};

const listFavoriteNotice = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Notice.getAll({ owner });
  res.json(result);
};

const getNoticeByCategory = async (req, res) => {
  const { category } = req.params;
  console.log('category CTRL');
  const result = await Notice.find({ category });
  if (!result) {
    throw httpError(404, `${category} not found`);
  }
  res.json(result);
};

const getNoticeById = async (req, res) => {
  const { id } = req.params;
  const result = await Notice.findById(id);
  console.log('id find');
  if (!result) {
    throw httpError(404, `${id} not found`);
  }
  res.json(result);
};

const addNotice = async (req, res) => {
  const result = await Notice.create(req.body);
  if (!result) {
    throw httpError(404, `Blablabla not found`);
  }
  res.status(201).json(result);
};

const deleteNotice = async (req, res) => {
  const { id } = req.params;
  const result = await Notice.findByIdAndDelete(id);
  if (!result) {
    throw httpError(404, `Notice with id:${id} not found`);
  }
  res.json({
    message: `Notice with id:${id} deleted`,
  });
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Notice.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw httpError(404, `Notice with id:${id} not found`);
  }
  res.json(result);
};

module.exports = {
  listAllNotice: ctrlWrapper(listAllNotice),
  getNoticeByCategory: ctrlWrapper(getNoticeByCategory),
  addNotice: ctrlWrapper(addNotice),
  // deleteNotice,
  // updateFavorite,
  getNoticeById: ctrlWrapper(getNoticeById),
};
