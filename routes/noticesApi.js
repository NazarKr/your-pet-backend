const express = require('express');
const router = express.Router();

const { noticeCtrl } = require('../controller');

const { authentication, isValidId, imageUpload } = require('../middlewares');
const { validateBody } = require('../helpers');

const { schemas } = require('../schemas');

// ============= всі оголошення
router.get('/', noticeCtrl.listAllNotice);

// ============ пошук оголошеннь по заголовку
router.get('/find', noticeCtrl.findNotices);

// ============ отримання оголошень по категоріям
router.get('/category/:category', noticeCtrl.getNoticeByCategory);

// ============ отримання одного оголошення по id
router.get('/:id', isValidId, noticeCtrl.getNoticeById);

// ============ додавання оголошення до обраних
router.patch(
  '/my/favorite/:id',
  authentication,
  isValidId,
  noticeCtrl.addToFavorite
);

// ============ видалення оголошення з обраних
router.delete(
  '/my/favorite/:id',
  authentication,
  isValidId,
  noticeCtrl.removeFromFavorite
);

// ============ отримання обраних
router.get('/my/favorite', authentication, noticeCtrl.allFavorite);

// ============ додавання оголошень
router.post(
  '/',
  authentication,
  imageUpload.single('noticeImage'),
  validateBody(schemas.sellSchema),
  noticeCtrl.addNotice
);

// ============ видалення оголошення
router.delete('/:id', authentication, isValidId, noticeCtrl.deleteNotice);

// ============ отримання оголошень створених користувачем
router.get('/my/created', authentication, noticeCtrl.myNotices);

module.exports = router;
