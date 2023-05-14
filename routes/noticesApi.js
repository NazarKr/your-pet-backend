const express = require('express');
const router = express.Router();

const { noticeCtrl } = require('../controller');

const { authentication } = require('../middlewares');
const { validateBody } = require('../helpers');

const { schema } = require('../schemas');
// const { authCtrl } = require('../controller');

// const { userValidation } = require('../schemas');
// const { authentication, upload } = require('../middlewares');
// const { validateBody } = require('../helpers');

// const { userRegisterShema, emailShema, userLoginShema, userUpdateShema } =
//   userValidation;
// ============= всі оголошення
router.get('/', noticeCtrl.listAllNotice);

// ============ створити ендпоінт для пошуку оголошеннь по заголовку
// router.get('/notices/:q');

// ============ створити ендпоінт для отримання оголошень по категоріям
router.get('/category/:category', noticeCtrl.getNoticeByCategory);

// ============ створити ендпоінт для отримання одного оголошення
router.get('/:id', noticeCtrl.getNoticeById);

// ============ створити ендпоінт для додавання оголошення до обраних
// router.get('/notices', authentication);

// ============ створити ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані
// router.get('/notices/:id/favorite', authentication);

// ============ створити ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних
// router.delete('/notices/:id/favorite', authentication);

// ============ створити ендпоінт для додавання оголошень відповідно до обраної категорії
router.post('/add', noticeCtrl.addNotice);

// ============ створити ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем
// router.get('/notices/:Id', authentication);

// ============ створити ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем
// router.delete('/notices/:id', authentication);

// ================== Рендер списку оголошень з продажу
// router.get('/notices/sell', noticesCtrl.sell);

// router.post('/notices/lost-found');

// router.post('/notices/for-free');

// router.post('/register', validateBody(userRegisterShema), authCtrl.register);

// router.get('/verify/:verifycationToken', authCtrl.verify);

// router.post('/verify', validateBody(emailShema), authCtrl.reVerify);

// router.post('/login', validateBody(userLoginShema), authCtrl.login);

// router.get('/current', authentication, authCtrl.current);

// router.patch(
//   '/update',
//   authentication,
//   validateBody(userUpdateShema),
//   authCtrl.update
// );

// router.post('/logout', authentication, authCtrl.logout);

// router.patch(
//   '/avatars',
//   authentication,
//   // upload.single('avatar'),
//   authCtrl.updateAvatar
// );

module.exports = router;
