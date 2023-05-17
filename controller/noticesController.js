const { Notice, User } = require('../schemas');


const {
  httpError,
  ctrlWrapper,
  skipPages,
  calculateAge,
} = require('../helpers');


const listAllNotice = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const result = await Notice.find({}, '-createdAt -updatedAt', {
    skip: skipPages(page, limit),
    limit,
  });

  if (!result) {
    throw httpError(404, `Notices not found`);
  }

  res.json(result);
};

/**
 * ============================ Поиск объявлений
 */
const findNotices = async (req, res) => {
  const { query = null, page = 1, limit = 10 } = req.query;

  if (!query) {
    throw httpError(400, 'Query parameter required');
  }

  const result = await Notice.find({ $text: { $search: query } }, '', {
    skip: skipPages(page, limit),
    limit,
  });

  if (!result) {
    throw httpError(404, `Notices not found`);
  }

  res.status(200).json(result);
};

/**
 * ============================ Получение всех объявлений по категории
 */
const getNoticeByCategory = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 10, sex, minage, maxage } = req.query;

  // 3-12
  // 1
  // 2

  // const age = calculateAge(birth);

  const result = await Notice.find({ category }, '', {
    skip: skipPages(page, limit),
    limit,
  });

  if (!result) {
    throw httpError(404, `${category} not found`);
  }

  res.json(result);
};

/**
 * ============================ Получение объявления по id
 */
const getNoticeById = async (req, res) => {
  const { id: _id } = req.params;

  const result = await Notice.findById(_id);

  if (!result) {
    throw httpError(404, `${_id} not found`);
  }

  res.json(result);
};

/**
 * ============================ Добавление в favorite
 */
const addToFavorite = async (req, res) => {
  const { id } = req.params;
  const { _id, favorite } = req.user;

  if (favorite.includes(id)) {
    throw httpError(400, `Notice with id:${id} already in favorite`);
  }

  const result = await User.findByIdAndUpdate(_id, { $push: { favorite: id } });

  if (!result) {
    throw httpError(404, `Notice with id:${id} not found`);
  }

  res.status(200).json({ message: `${id} Successfully added to favorite` });
};

/**
 * ============================ Удаление из favorite
 */
const removeFromFavorite = async (req, res) => {
  const { id } = req.params;
  const { _id, favorite } = req.user;

  if (!favorite.includes(id)) {
    throw httpError(400, `Notice with id:${id} not in favorite`);
  }

  const result = await User.findByIdAndUpdate(_id, { $pull: { favorite: id } });

  if (!result) {
    throw httpError(404, `Notice with id:${id} not found`);
  }

  res.status(200).json({ message: `${id} Successfully removed from favorite` });
};

/**
 * ============================ Получение всех favorite
 */
const allFavorite = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;

  const result = await User.findById(_id, '', {
    fields: {
      favorite: 1,
    },
    skip: skipPages(page, limit),
    limit,
  }).populate('favorite');

  if (result.favorite.length === 0) {
    throw httpError(404, `Favorite notices list is empty`);
  }

  res.json(result.favorite);
};

/**
 * ============================ Добавление объявления
 */
const addNotice = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Notice.create({
    ...req.body,
    owner,
    img: req.file.path,
  });

  if (!req.body || req.body === {}) {
    throw httpError(400);

  if (!result) {
    throw httpError(404, `Image not found`);

  res.status(201).json(result);
};

/**
 * ============================ Удаление объявления
 */
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

/**
 * ============================ Мои объявления
 */
const myNotices = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;

  const result = await Notice.find({ owner }, '', {
    skip: skipPages(page, limit),
    limit,
  });

  res.json(result);
};

module.exports = {
  listAllNotice: ctrlWrapper(listAllNotice),
  findNotices: ctrlWrapper(findNotices),
  getNoticeByCategory: ctrlWrapper(getNoticeByCategory),
  getNoticeById: ctrlWrapper(getNoticeById),
  addToFavorite: ctrlWrapper(addToFavorite),
  removeFromFavorite: ctrlWrapper(removeFromFavorite),
  allFavorite: ctrlWrapper(allFavorite),
  addNotice: ctrlWrapper(addNotice),
  deleteNotice: ctrlWrapper(deleteNotice),
  myNotices: ctrlWrapper(myNotices),
};
