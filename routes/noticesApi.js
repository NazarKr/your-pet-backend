const express = require('express');
const router = express.Router();

const { noticeCtrl } = require('../controller');

const { authentication, isValidId } = require('../middlewares');
const { validateBody } = require('../helpers');

const { schemas } = require('../schemas');

// ============= всі оголошення
router.get('/', noticeCtrl.listAllNotice);

// ============ створити ендпоінт для пошуку оголошеннь по заголовку
// router.get('/notices/:q');

// ============ створити ендпоінт для отримання оголошень по категоріям
router.get('/category/:category', noticeCtrl.getNoticeByCategory);

// ============ створити ендпоінт для отримання одного оголошення
router.get('/:id', isValidId, noticeCtrl.getNoticeById);

// ============ створити ендпоінт для додавання оголошення до обраних
router.patch(
  '/favorite/:id',
  authentication,
  isValidId,
  noticeCtrl.updateFavorite
);

// ============ створити ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані
// router.get(
//   '/notices/favorite/:owner',
//   authentication,
//   isValidId,
//   noticeCtrl.litsOwnerFavorite
// );

// ============ створити ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних
// router.delete(
//   '/notices/favorite/:owner/:id',
//   authentication,
//   isValidId,
//   noticeCtrl.deleteNotice
// );

// ============ створити ендпоінт для додавання оголошень відповідно до обраної категорії
router.post(
  '/add',
  authentication,
  validateBody(schemas.sellSchema),
  noticeCtrl.addNotice
);

// ============ створити ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем
// router.get('/notices/added', authentication, noticeCtrl.litsOwnerAdded);

// ============ створити ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем
// router.delete(
//   '/notices/added/:owner/:id',
//   isValidId,
//   noticeCtrl.deleteOwnerAdded
// );

module.exports = router;
