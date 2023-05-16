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
  '/favorite/:id',
  authentication,
  isValidId,
  noticeCtrl.addToFavorite
);

// ============ видалення оголошення з обраних
router.delete(
  '/favorite/:id',
  authentication,
  isValidId,
  noticeCtrl.removeFromFavorite
);

// ============ отримання обраних
router.get('/favorite/all', authentication, noticeCtrl.allFavorite);

// ============ додавання оголошень
router.post(
  '/',
  authentication,
  // validateBody(schemas.sellSchema),
  imageUpload.single('noticeImage'),
  noticeCtrl.addNotice
);

// ============ видалення оголошення
router.delete('/:id', authentication, isValidId, noticeCtrl.deleteNotice);

// ============ отримання оголошень створених користувачем
router.get('/my/all', authentication, noticeCtrl.myNotices);

module.exports = router;
